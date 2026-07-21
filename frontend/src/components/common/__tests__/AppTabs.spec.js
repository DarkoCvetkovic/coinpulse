import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTabs from '../AppTabs.vue'

const testId = 'explorer-tabs'
const tabs = [
  { key: 'request', label: 'Request' },
  { key: 'response', label: 'Response' },
]
const activeTab = tabs[0].key
const panelContent = 'Request body editor'

describe('AppTabs', () => {
  it('renders one tab button per entry with derived test ids', () => {
    const wrapper = mount(AppTabs, { props: { testId, tabs, modelValue: activeTab } })

    expect(wrapper.find(`[data-testid="${testId}-${tabs[0].key}"]`).text()).toBe(tabs[0].label)
    expect(wrapper.find(`[data-testid="${testId}-${tabs[1].key}"]`).text()).toBe(tabs[1].label)
  })

  it('marks only the active tab as selected', () => {
    const wrapper = mount(AppTabs, { props: { testId, tabs, modelValue: activeTab } })
    const active = wrapper.find(`[data-testid="${testId}-${tabs[0].key}"]`)
    const inactive = wrapper.find(`[data-testid="${testId}-${tabs[1].key}"]`)

    expect(active.classes()).toContain('app-tabs__tab--active')
    expect(active.attributes('aria-selected')).toBe('true')
    expect(inactive.classes()).not.toContain('app-tabs__tab--active')
    expect(inactive.attributes('aria-selected')).toBe('false')
  })

  it('emits the clicked tab key through v-model', async () => {
    const wrapper = mount(AppTabs, { props: { testId, tabs, modelValue: activeTab } })

    await wrapper.find(`[data-testid="${testId}-${tabs[1].key}"]`).trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([[tabs[1].key]])
  })

  it('renders the slot named after the active tab in the panel', () => {
    const wrapper = mount(AppTabs, {
      props: { testId, tabs, modelValue: activeTab },
      slots: { [activeTab]: panelContent },
    })

    expect(wrapper.find(`[data-testid="${testId}-panel"]`).text()).toBe(panelContent)
  })
})
