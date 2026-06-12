import http from './http'

export const filesApi = {
  /** Admin only - uploads a logo image for a coin. */
  async uploadLogo(coinId, file) {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await http.post(`/api/coins/${coinId}/logo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  /** Fetches the served logo as a blob (the endpoint requires the auth header). */
  async fetchLogo(coinId) {
    const { data } = await http.get(`/api/coins/${coinId}/logo`, { responseType: 'blob' })
    return data
  },

  /** Downloads the portfolio export and returns it as a blob. */
  async exportPortfolio(format) {
    const { data } = await http.get('/api/portfolio/export', {
      params: { format },
      responseType: 'blob',
    })
    return data
  },
}

/** Triggers a browser download of a blob under the given filename. */
export function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
