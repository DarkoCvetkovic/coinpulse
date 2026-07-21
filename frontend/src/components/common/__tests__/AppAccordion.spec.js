import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppAccordion from '../AppAccordion.vue'

const testId = 'faq-accordion'
const items = [
  { key: 'fees', title: 'What are the fees?', content: 'There are no fees.' },
  { key: 'security', title: 'Is it secure?', content: 'Prices are seeded and deterministic.' },
]

describe('AppAccordion', () => {
  it('renders one collapsed item per entry', () => {
    const wrapper = mount(AppAccordion, { props: { testId, items } })

    expect(wrapper.findAll('.accordion__item')).toHaveLength(items.length)
    expect(wrapper.find(`[data-testid="${testId}-content-${items[0].key}"]`).exists()).toBe(false)
    expect(wrapper.find(`[data-testid="${testId}-content-${items[1].key}"]`).exists()).toBe(false)
  })

  it('opens an item on toggle click and shows its content', async () => {
    const wrapper = mount(AppAccordion, { props: { testId, items } })
    const toggle = wrapper.find(`[data-testid="${testId}-toggle-${items[0].key}"]`)

    await toggle.trigger('click')

    expect(toggle.attributes('aria-expanded')).toBe('true')
    expect(wrapper.find(`[data-testid="${testId}-content-${items[0].key}"]`).text()).toBe(
      items[0].content
    )
  })

  it('closes an open item when its toggle is clicked again', async () => {
    const wrapper = mount(AppAccordion, { props: { testId, items } })
    const toggle = wrapper.find(`[data-testid="${testId}-toggle-${items[0].key}"]`)

    await toggle.trigger('click')
    await toggle.trigger('click')

    expect(toggle.attributes('aria-expanded')).toBe('false')
    expect(wrapper.find(`[data-testid="${testId}-content-${items[0].key}"]`).exists()).toBe(false)
  })

  it('keeps a single item open at a time', async () => {
    const wrapper = mount(AppAccordion, { props: { testId, items } })

    await wrapper.find(`[data-testid="${testId}-toggle-${items[0].key}"]`).trigger('click')
    await wrapper.find(`[data-testid="${testId}-toggle-${items[1].key}"]`).trigger('click')

    expect(wrapper.find(`[data-testid="${testId}-content-${items[0].key}"]`).exists()).toBe(false)
    expect(wrapper.find(`[data-testid="${testId}-content-${items[1].key}"]`).exists()).toBe(true)
  })
})
