import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppPagination from '../AppPagination.vue'

const threePages = { page: 0, totalPages: 3 }
const lastOfThreePages = { page: 2, totalPages: 3 }
const singlePage = { page: 0, totalPages: 1 }

describe('AppPagination', () => {
  it('is hidden when there is a single page', () => {
    const wrapper = mount(AppPagination, { props: singlePage })

    expect(wrapper.find('[data-testid="pagination"]').exists()).toBe(false)
  })

  it('renders one button per page plus prev and next', () => {
    const wrapper = mount(AppPagination, { props: threePages })

    expect(wrapper.find('[data-testid="pagination-prev"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="pagination-next"]').exists()).toBe(true)
    expect(wrapper.findAll('.pagination__button')).toHaveLength(threePages.totalPages + 2)
  })

  it('disables prev on the first page and next on the last page', () => {
    const firstPage = mount(AppPagination, { props: threePages })
    const lastPage = mount(AppPagination, { props: lastOfThreePages })

    expect(firstPage.find('[data-testid="pagination-prev"]').attributes('disabled')).toBeDefined()
    expect(firstPage.find('[data-testid="pagination-next"]').attributes('disabled')).toBeUndefined()
    expect(lastPage.find('[data-testid="pagination-next"]').attributes('disabled')).toBeDefined()
    expect(lastPage.find('[data-testid="pagination-prev"]').attributes('disabled')).toBeUndefined()
  })

  it('marks the current page button as active', () => {
    const wrapper = mount(AppPagination, { props: threePages })

    expect(wrapper.find('[data-testid="pagination-page-1"]').classes()).toContain(
      'pagination__button--active'
    )
    expect(wrapper.find('[data-testid="pagination-page-2"]').classes()).not.toContain(
      'pagination__button--active'
    )
  })

  it('emits change with the zero-based page on page click', async () => {
    const wrapper = mount(AppPagination, { props: threePages })

    await wrapper.find('[data-testid="pagination-page-3"]').trigger('click')

    expect(wrapper.emitted('change')).toEqual([[2]])
  })

  it('emits change for prev and next relative to the current page', async () => {
    const wrapper = mount(AppPagination, { props: { page: 1, totalPages: 3 } })

    await wrapper.find('[data-testid="pagination-prev"]').trigger('click')
    await wrapper.find('[data-testid="pagination-next"]').trigger('click')

    expect(wrapper.emitted('change')).toEqual([[0], [2]])
  })
})
