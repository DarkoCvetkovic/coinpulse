import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import SuccessAlert from '../SuccessAlert.vue'

const message = 'Transaction saved'
const customTestId = 'trade-success-alert'

describe('SuccessAlert', () => {
  it('renders the message as a status element', () => {
    const wrapper = mount(SuccessAlert, { props: { message } })
    const alert = wrapper.find('[data-testid="success-alert"]')

    expect(alert.exists()).toBe(true)
    expect(alert.text()).toBe(message)
    expect(alert.attributes('role')).toBe('status')
  })

  it('renders with a custom test id', () => {
    const wrapper = mount(SuccessAlert, { props: { message, testId: customTestId } })

    expect(wrapper.find(`[data-testid="${customTestId}"]`).exists()).toBe(true)
  })
})
