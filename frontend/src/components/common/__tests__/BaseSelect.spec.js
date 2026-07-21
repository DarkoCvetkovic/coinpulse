import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseSelect from '../BaseSelect.vue'

const testId = 'category-select'
const label = 'Category'
const options = [
  { value: 'l1', label: 'Layer 1' },
  { value: 'defi', label: 'DeFi' },
]
const placeholder = 'All categories'

describe('BaseSelect', () => {
  it('renders the label and one option per entry plus the placeholder', () => {
    const wrapper = mount(BaseSelect, { props: { testId, label, options, placeholder } })
    const renderedOptions = wrapper.findAll('option')

    expect(wrapper.find('.base-select__label').text()).toBe(label)
    expect(renderedOptions).toHaveLength(options.length + 1)
    expect(renderedOptions[0].text()).toBe(placeholder)
    expect(renderedOptions[0].attributes('value')).toBe('')
  })

  it('renders option labels and values from the options prop', () => {
    const wrapper = mount(BaseSelect, { props: { testId, label, options } })
    const lastOption = wrapper.findAll('option').at(-1)

    expect(lastOption.text()).toBe(options[1].label)
    expect(lastOption.attributes('value')).toBe(options[1].value)
  })

  it('emits the selected value through v-model', async () => {
    const wrapper = mount(BaseSelect, { props: { testId, label, options } })

    await wrapper.find(`[data-testid="${testId}"]`).setValue(options[1].value)

    expect(wrapper.emitted('update:modelValue')).toEqual([[options[1].value]])
  })
})
