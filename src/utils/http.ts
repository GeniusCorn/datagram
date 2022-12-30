import router from '@/router'
import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
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
    if (error.response?.status === 401 || error.response?.status === 403) {
      window.$message?.error(error.response.data.message)

      localStorage.removeItem('token')

      await router.push('/login')
    } else {
      window.$message?.error('网络错误，请检查网络连接')
    }

    return error.response
  }
)

export default api
