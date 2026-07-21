import { describe, expect, it, vi } from 'vitest'
import { useAsync } from '../useAsync'

const successValue = 'loaded-data'
const failure = new Error('request failed')

describe('useAsync', () => {
  it('starts idle with empty state', () => {
    const { data, loading, error } = useAsync(vi.fn())

    expect(data.value).toBeNull()
    expect(loading.value).toBe(false)
    expect(error.value).toBeNull()
  })

  it('execute resolves, stores the data and returns it', async () => {
    const fn = vi.fn().mockResolvedValue(successValue)
    const { data, loading, error, execute } = useAsync(fn)

    const result = await execute()

    expect(result).toBe(successValue)
    expect(data.value).toBe(successValue)
    expect(error.value).toBeNull()
    expect(loading.value).toBe(false)
  })

  it('execute forwards its arguments to the wrapped function', async () => {
    const fn = vi.fn().mockResolvedValue(successValue)
    const { execute } = useAsync(fn)
    const firstArg = 'page'
    const secondArg = 2

    await execute(firstArg, secondArg)

    expect(fn).toHaveBeenCalledWith(firstArg, secondArg)
  })

  it('loading is true while the call is in flight', async () => {
    let resolvePending
    const fn = vi.fn(
      () =>
        new Promise((resolve) => {
          resolvePending = resolve
        })
    )
    const { loading, execute } = useAsync(fn)

    const pending = execute()

    expect(loading.value).toBe(true)
    resolvePending(successValue)
    await pending
    expect(loading.value).toBe(false)
  })

  it('execute stores the error, rethrows and stops loading', async () => {
    const fn = vi.fn().mockRejectedValue(failure)
    const { data, loading, error, execute } = useAsync(fn)

    await expect(execute()).rejects.toThrow(failure.message)

    expect(error.value).toBe(failure)
    expect(data.value).toBeNull()
    expect(loading.value).toBe(false)
  })

  it('a new execute clears the previous error', async () => {
    const fn = vi.fn().mockRejectedValueOnce(failure).mockResolvedValueOnce(successValue)
    const { error, execute } = useAsync(fn)
    await expect(execute()).rejects.toThrow(failure.message)

    await execute()

    expect(error.value).toBeNull()
  })
})
