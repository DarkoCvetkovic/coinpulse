const RECHECK_EVENT = 'cypress:io-recheck'

/**
 * Marker property set on the AUT window so a test can assert the shim really
 * installed before relying on it.
 */
export const LAZY_SHIM_FLAG = '__coinpulseLazyShim'

interface FakeEntry {
  isIntersecting: boolean
  target: Element
  intersectionRatio: number
}

type FakeCallback = (entries: FakeEntry[], observer: unknown) => void

/**
 * Replaces the native IntersectionObserver on the AUT window with a
 * geometry-driven shim, so tests can drive lazy-loading deterministically.
 *
 * Headless runners (cypress run) do not deliver IntersectionObserver callbacks
 * on a programmatic scroll, even when the target is geometrically in view, so
 * an IO-driven lazy list never loads under automation. The shim recomputes the
 * intersection from getBoundingClientRect on real scroll events and on an
 * explicit re-check event that {@link triggerLazyCheck} dispatches. The initial
 * check after observe() is deferred and geometry-based, so content below the
 * fold does not auto-load and "first batch only" assertions stay valid.
 *
 * Install it in cy.visit's onBeforeLoad, before the app boots.
 */
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
    Object.defineProperty(win, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: Observer,
    })
  }
  ;(win as unknown as Record<string, boolean>)[LAZY_SHIM_FLAG] = true
}

/**
 * Forces every observer created by the shim to re-emit as intersecting,
 * loading the next lazy batch regardless of how the runner scrolled.
 */
export function triggerLazyCheck(win: Cypress.AUTWindow) {
  win.dispatchEvent(new win.Event(RECHECK_EVENT))
}
