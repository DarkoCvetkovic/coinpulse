import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorAlert from '../ErrorAlert.vue'

const message = 'Invalid credentials'
const customTestId = 'login-error-alert'

describe('ErrorAlert', () => {
  it('renders the message as an alert element', () => {
    const wrapper = mount(ErrorAlert, { props: { message } })
    const alert = wrapper.find('[data-testid="error-alert"]')

    expect(alert.exists()).toBe(true)
    expect(alert.text()).toBe(message)
    expect(alert.attributes('role')).toBe('alert')
  })

  it('renders with a custom test id', () => {
    const wrapper = mount(ErrorAlert, { props: { message, testId: customTestId } })

    expect(wrapper.find(`[data-testid="${customTestId}"]`).exists()).toBe(true)
  })
})
