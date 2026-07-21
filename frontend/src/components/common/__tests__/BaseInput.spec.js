import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseInput from '../BaseInput.vue'

const testId = 'username-input'
const label = 'Username'
const errorMessage = 'Username is required'
const typedValue = 'standard_user'

describe('BaseInput', () => {
  it('renders the label and the input with the test id', () => {
    const wrapper = mount(BaseInput, { props: { testId, label } })

    expect(wrapper.find('.base-input__label').text()).toBe(label)
    expect(wrapper.find(`[data-testid="${testId}"]`).exists()).toBe(true)
  })

  it('defaults to a text input and honours the type prop', () => {
    const textWrapper = mount(BaseInput, { props: { testId, label } })
    const passwordWrapper = mount(BaseInput, { props: { testId, label, type: 'password' } })

    expect(textWrapper.find('input').attributes('type')).toBe('text')
    expect(passwordWrapper.find('input').attributes('type')).toBe('password')
  })

  it('emits the typed value through v-model', async () => {
    const wrapper = mount(BaseInput, { props: { testId, label } })

    await wrapper.find('input').setValue(typedValue)

    expect(wrapper.emitted('update:modelValue')).toEqual([[typedValue]])
  })

  it('shows the error message and error styling when error is set', () => {
    const wrapper = mount(BaseInput, { props: { testId, label, error: errorMessage } })
    const error = wrapper.find(`[data-testid="${testId}-error"]`)

    expect(error.text()).toBe(errorMessage)
    expect(wrapper.find('input').classes()).toContain('base-input__field--error')
  })

  it('renders no error element without an error', () => {
    const wrapper = mount(BaseInput, { props: { testId, label } })

    expect(wrapper.find(`[data-testid="${testId}-error"]`).exists()).toBe(false)
  })
})
