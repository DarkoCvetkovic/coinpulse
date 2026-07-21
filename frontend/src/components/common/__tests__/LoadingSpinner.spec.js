import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingSpinner from '../LoadingSpinner.vue'

const defaultLabel = 'Loading...'
const customLabel = 'Fetching coins...'

describe('LoadingSpinner', () => {
  it('renders as a status element with the default label', () => {
    const wrapper = mount(LoadingSpinner)
    const spinner = wrapper.find('[data-testid="loading-spinner"]')

    expect(spinner.attributes('role')).toBe('status')
    expect(wrapper.find('.loading-spinner__label').text()).toBe(defaultLabel)
  })

  it('renders a custom label', () => {
    const wrapper = mount(LoadingSpinner, { props: { label: customLabel } })

    expect(wrapper.find('.loading-spinner__label').text()).toBe(customLabel)
  })
})
