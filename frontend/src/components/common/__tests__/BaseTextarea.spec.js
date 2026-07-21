import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTextarea from '../BaseTextarea.vue'

const testId = 'notes-textarea'
const label = 'Notes'
const errorMessage = 'Notes are too long'
const typedValue = 'Bought the dip'
const rows = 5
const maxlength = 200

describe('BaseTextarea', () => {
  it('renders the label and the textarea with the test id', () => {
    const wrapper = mount(BaseTextarea, { props: { testId, label } })

    expect(wrapper.find('.base-textarea__label').text()).toBe(label)
    expect(wrapper.find(`[data-testid="${testId}"]`).exists()).toBe(true)
  })

  it('passes rows and maxlength through to the textarea', () => {
    const wrapper = mount(BaseTextarea, { props: { testId, label, rows, maxlength } })
    const textarea = wrapper.find('textarea')

    expect(textarea.attributes('rows')).toBe(String(rows))
    expect(textarea.attributes('maxlength')).toBe(String(maxlength))
  })

  it('emits the typed value through v-model', async () => {
    const wrapper = mount(BaseTextarea, { props: { testId, label } })

    await wrapper.find('textarea').setValue(typedValue)

    expect(wrapper.emitted('update:modelValue')).toEqual([[typedValue]])
  })

  it('shows the error message and error styling when error is set', () => {
    const wrapper = mount(BaseTextarea, { props: { testId, label, error: errorMessage } })

    expect(wrapper.find(`[data-testid="${testId}-error"]`).text()).toBe(errorMessage)
    expect(wrapper.find('textarea').classes()).toContain('base-textarea__field--error')
  })

  it('renders no error element without an error', () => {
    const wrapper = mount(BaseTextarea, { props: { testId, label } })

    expect(wrapper.find(`[data-testid="${testId}-error"]`).exists()).toBe(false)
  })
})
