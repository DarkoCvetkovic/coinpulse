import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseModal from '../BaseModal.vue'

const testId = 'confirm-modal'
const title = 'Confirm delete'
const bodyText = 'Are you sure?'
const footerText = 'Footer actions'
const teleportStub = { global: { stubs: { teleport: true } } }

describe('BaseModal', () => {
  it('renders the title, body slot and close button', () => {
    const wrapper = mount(BaseModal, {
      props: { testId, title },
      slots: { default: bodyText },
      ...teleportStub,
    })

    expect(wrapper.find(`[data-testid="${testId}"]`).attributes('role')).toBe('dialog')
    expect(wrapper.find('.modal__title').text()).toBe(title)
    expect(wrapper.find('.modal__body').text()).toBe(bodyText)
    expect(wrapper.find(`[data-testid="${testId}-close"]`).exists()).toBe(true)
  })

  it('renders the footer only when the footer slot is provided', () => {
    const withFooter = mount(BaseModal, {
      props: { testId, title },
      slots: { footer: footerText },
      ...teleportStub,
    })
    const withoutFooter = mount(BaseModal, { props: { testId, title }, ...teleportStub })

    expect(withFooter.find('.modal__footer').text()).toBe(footerText)
    expect(withoutFooter.find('.modal__footer').exists()).toBe(false)
  })

  it('emits close when the close button is clicked', async () => {
    const wrapper = mount(BaseModal, { props: { testId, title }, ...teleportStub })

    await wrapper.find(`[data-testid="${testId}-close"]`).trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('emits close on a direct backdrop click', async () => {
    const wrapper = mount(BaseModal, { props: { testId, title }, ...teleportStub })

    await wrapper.find(`[data-testid="${testId}-backdrop"]`).trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('does not emit close when the dialog itself is clicked', async () => {
    const wrapper = mount(BaseModal, { props: { testId, title }, ...teleportStub })

    await wrapper.find(`[data-testid="${testId}"]`).trigger('click')

    expect(wrapper.emitted('close')).toBeUndefined()
  })

  it('emits close on Escape and stops listening after unmount', async () => {
    const wrapper = mount(BaseModal, { props: { testId, title }, ...teleportStub })

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    const closeEvents = wrapper.emitted('close')
    expect(closeEvents).toHaveLength(1)

    wrapper.unmount()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(closeEvents).toHaveLength(1)
  })

  it('ignores other keys', () => {
    const wrapper = mount(BaseModal, { props: { testId, title }, ...teleportStub })

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

    expect(wrapper.emitted('close')).toBeUndefined()
  })
})
