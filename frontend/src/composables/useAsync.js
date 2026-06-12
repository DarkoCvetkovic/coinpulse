import { ref } from 'vue'

/**
 * Wraps an async function with loading/error/data state,
 * so pages don't repeat the same try/catch/finally dance.
 */
export function useAsync(fn) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function execute(...args) {
    loading.value = true
    error.value = null
    try {
      data.value = await fn(...args)
      return data.value
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, execute }
}
