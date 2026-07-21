import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseRadioGroup from '../BaseRadioGroup.vue'

const testId = 'side-radio-group'
const label = 'Side'
const options = [
  { value: 'buy', label: 'Buy' },
  { value: 'sell', label: 'Sell' },
]
const errorMessage = 'Pick a side'

describe('BaseRadioGroup', () => {
  it('renders the legend and one radio per option with derived test ids', () => {
    const wrapper = mount(BaseRadioGroup, { props: { testId, label, options } })

    expect(wrapper.find('legend').text()).toBe(label)
    expect(wrapper.find(`[data-testid="${testId}-${options[0].value}"]`).exists()).toBe(true)
    expect(wrapper.find(`[data-testid="${testId}-${options[1].value}"]`).exists()).toBe(true)
  })

  it('marks the selected option row as checked', () => {
    const wrapper = mount(BaseRadioGroup, {
      props: { testId, label, options, modelValue: options[0].value },
    })
    const rows = wrapper.findAll('.base-radio-group__option')

    expect(rows[0].classes()).toContain('base-radio-group__option--checked')
    expect(rows[1].classes()).not.toContain('base-radio-group__option--checked')
  })

  it('emits the picked value through v-model', async () => {
    const wrapper = mount(BaseRadioGroup, { props: { testId, label, options } })

    await wrapper.find(`[data-testid="${testId}-${options[1].value}"]`).setValue(true)

    expect(wrapper.emitted('update:modelValue')).toEqual([[options[1].value]])
  })

  it('shows the error message when error is set', () => {
    const wrapper = mount(BaseRadioGroup, {
      props: { testId, label, options, error: errorMessage },
    })

    expect(wrapper.find(`[data-testid="${testId}-error"]`).text()).toBe(errorMessage)
  })
})
