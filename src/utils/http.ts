import router from '@/router'
import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  async (config) => {
    const handleConfig = { ...config }

    if (handleConfig.headers != null) {
      handleConfig.headers.token = localStorage.getItem('token')
    }

    return handleConfig
  },
  async (error) => {
    // console.log(error)
    return await Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    // if (response.status !== 200) return Promise.reject(response.data)

    return response
  },
  async (error) => {
    if (error.code === 'ERR_NETWORK') {
      window.$message?.error('网络错误，请检查网络连接')
    }

    if (error.response?.status === 401 || error.response?.status === 403) {
      window.$message?.error(error.response.data.message)

      localStorage.removeItem('token')

      await router.push('/login')
    }

    return error.response
  }
)

export default api
