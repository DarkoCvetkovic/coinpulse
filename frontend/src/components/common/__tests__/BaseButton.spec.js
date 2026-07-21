import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '../BaseButton.vue'

const testId = 'save-button'
const slotText = 'Save changes'

describe('BaseButton', () => {
  it('renders the slot content as a button with the test id', () => {
    const wrapper = mount(BaseButton, { props: { testId }, slots: { default: slotText } })
    const button = wrapper.find(`[data-testid="${testId}"]`)

    expect(button.exists()).toBe(true)
    expect(button.text()).toBe(slotText)
    expect(button.attributes('type')).toBe('button')
  })

  it('applies the primary variant by default', () => {
    const wrapper = mount(BaseButton, { props: { testId } })

    expect(wrapper.find('button').classes()).toContain('base-button--primary')
  })

  it('applies the requested variant class', () => {
    const wrapper = mount(BaseButton, { props: { testId, variant: 'danger' } })

    expect(wrapper.find('button').classes()).toContain('base-button--danger')
  })

  it('is disabled when the disabled prop is set', () => {
    const wrapper = mount(BaseButton, { props: { testId, disabled: true } })

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('is disabled and shows a spinner while loading', () => {
    const wrapper = mount(BaseButton, { props: { testId, loading: true } })

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.base-button__spinner').exists()).toBe(true)
  })

  it('shows no spinner when not loading', () => {
    const wrapper = mount(BaseButton, { props: { testId } })

    expect(wrapper.find('.base-button__spinner').exists()).toBe(false)
  })
})
