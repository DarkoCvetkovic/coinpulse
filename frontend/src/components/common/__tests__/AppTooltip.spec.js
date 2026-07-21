import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTooltip from '../AppTooltip.vue'

const testId = 'fee-tooltip'
const text = 'Fees are always zero'
const customTrigger = 'Fees'

describe('AppTooltip', () => {
  it('renders the bubble with the tooltip text and role', () => {
    const wrapper = mount(AppTooltip, { props: { testId, text } })
    const bubble = wrapper.find(`[data-testid="${testId}-bubble"]`)

    expect(bubble.attributes('role')).toBe('tooltip')
    expect(bubble.text()).toBe(text)
  })

  it('falls back to the question mark icon without a slot', () => {
    const wrapper = mount(AppTooltip, { props: { testId, text } })

    expect(wrapper.find('.tooltip__icon').text()).toBe('?')
  })

  it('renders custom trigger content from the slot', () => {
    const wrapper = mount(AppTooltip, {
      props: { testId, text },
      slots: { default: customTrigger },
    })

    expect(wrapper.find('.tooltip__icon').exists()).toBe(false)
    expect(wrapper.find(`[data-testid="${testId}"]`).text()).toContain(customTrigger)
  })
})
