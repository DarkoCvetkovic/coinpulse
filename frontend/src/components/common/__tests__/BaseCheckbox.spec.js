import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCheckbox from '../BaseCheckbox.vue'

const testId = 'remember-me-checkbox'
const label = 'Remember me'
const errorMessage = 'You must accept the terms'

describe('BaseCheckbox', () => {
  it('renders the label next to the checkbox with the test id', () => {
    const wrapper = mount(BaseCheckbox, { props: { testId, label } })
    const checkbox = wrapper.find(`[data-testid="${testId}"]`)

    expect(checkbox.attributes('type')).toBe('checkbox')
    expect(wrapper.find('.base-checkbox__row').text()).toBe(label)
  })

  it('emits the checked state through v-model', async () => {
    const wrapper = mount(BaseCheckbox, { props: { testId, label } })

    await wrapper.find('input').setValue(true)

    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  })

  it('shows the error message when error is set', () => {
    const wrapper = mount(BaseCheckbox, { props: { testId, label, error: errorMessage } })

    expect(wrapper.find(`[data-testid="${testId}-error"]`).text()).toBe(errorMessage)
  })

  it('renders no error element without an error', () => {
    const wrapper = mount(BaseCheckbox, { props: { testId, label } })

    expect(wrapper.find(`[data-testid="${testId}-error"]`).exists()).toBe(false)
  })
})
