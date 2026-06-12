import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import router from '../router'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const isLoginCall = error.config?.url?.includes('/api/auth/login')
    // An expired or invalid token anywhere outside the login form ends the session
    if (status === 401 && !isLoginCall) {
      const auth = useAuthStore()
      auth.clearSession()
      router.push({ name: 'login' })
    }
    return Promise.reject(error)
  }
)

export default http
