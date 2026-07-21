import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCard from '../BaseCard.vue'

const testId = 'portfolio-card'
const title = 'Portfolio value'
const bodyText = 'Card body'
const actionsText = 'Refresh'

describe('BaseCard', () => {
  it('renders the default slot inside a section with the test id', () => {
    const wrapper = mount(BaseCard, { props: { testId }, slots: { default: bodyText } })
    const card = wrapper.find(`[data-testid="${testId}"]`)

    expect(card.exists()).toBe(true)
    expect(card.text()).toContain(bodyText)
  })

  it('renders the title in a header when provided', () => {
    const wrapper = mount(BaseCard, { props: { testId, title } })

    expect(wrapper.find('.base-card__header').exists()).toBe(true)
    expect(wrapper.find('.base-card__title').text()).toBe(title)
  })

  it('renders no header without a title or actions', () => {
    const wrapper = mount(BaseCard, { props: { testId } })

    expect(wrapper.find('.base-card__header').exists()).toBe(false)
  })

  it('renders the actions slot in the header even without a title', () => {
    const wrapper = mount(BaseCard, { props: { testId }, slots: { actions: actionsText } })

    expect(wrapper.find('.base-card__header').exists()).toBe(true)
    expect(wrapper.find('.base-card__actions').text()).toBe(actionsText)
  })
})
