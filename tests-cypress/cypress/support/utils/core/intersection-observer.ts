// Headless test runners (Cypress `run`, the preview renderer) do not deliver
// IntersectionObserver callbacks on a programmatic scroll - even when the element is
// geometrically in view - and programmatic scroll does not reliably fire `scroll`
// events either. Only getBoundingClientRect geometry is dependable. So an IO-driven
// lazy list never loads under automation. This installs a drop-in replacement, before
// the app boots (cy.visit onBeforeLoad), that the test drives explicitly:
//   - the deferred initial check and `scroll` events use real geometry, so the list
//     does NOT auto-load below the fold (the "first batch only" assertion stays valid),
//   - triggerLazyCheck dispatches an event that forces an intersection, loading the
//     next batch deterministically regardless of how the runner scrolls.

const RECHECK_EVENT = 'cypress:io-recheck'

// Marker set on the AUT window so a spec can assert the shim really installed
// (otherwise an onBeforeLoad that never ran would only show up as a confusing count).
export const LAZY_SHIM_FLAG = '__coinpulseLazyShim'

interface FakeEntry {
  isIntersecting: boolean
  target: Element
  intersectionRatio: number
}

type FakeCallback = (entries: FakeEntry[], observer: unknown) => void

export function installScrollDrivenIntersectionObserver(win: Cypress.AUTWindow) {
  class ScrollDrivenIntersectionObserver {
    private readonly callback: FakeCallback
    private readonly targets = new Set<Element>()
    private readonly onScroll = () => this.targets.forEach(target => this.emit(target, false))
    private readonly onForce = () => this.targets.forEach(target => this.emit(target, true))

    constructor(callback: FakeCallback) {
      this.callback = callback
      win.addEventListener('scroll', this.onScroll, { passive: true })
      win.addEventListener(RECHECK_EVENT, this.onForce)
    }

    observe(target: Element) {
      this.targets.add(target)
      // Defer so the app has painted its first batch before the initial check,
      // matching the native observer (which would not auto-load below the fold).
      win.setTimeout(() => this.emit(target, false), 0)
    }

    unobserve(target: Element) {
      this.targets.delete(target)
    }

    disconnect() {
      this.targets.clear()
      win.removeEventListener('scroll', this.onScroll)
      win.removeEventListener(RECHECK_EVENT, this.onForce)
    }

    takeRecords(): FakeEntry[] {
      return []
    }

    private emit(target: Element, force: boolean) {
      const rect = target.getBoundingClientRect()
      const isIntersecting = force || (rect.top < win.innerHeight && rect.bottom > 0)
      this.callback([{ isIntersecting, target, intersectionRatio: isIntersecting ? 1 : 0 }], this)
    }
  }

  const Observer = ScrollDrivenIntersectionObserver as unknown as typeof IntersectionObserver
  try {
    win.IntersectionObserver = Observer
  } catch {
    // Some runners expose IntersectionObserver as a read-only global; force it.
    Object.defineProperty(win, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: Observer,
    })
  }
  ;(win as unknown as Record<string, boolean>)[LAZY_SHIM_FLAG] = true
}

export function triggerLazyCheck(win: Cypress.AUTWindow) {
  win.dispatchEvent(new win.Event(RECHECK_EVENT))
}
