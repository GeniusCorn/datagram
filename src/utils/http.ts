import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // console.log(config)
    return config
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
  (error) => {
    return error.response
  }
)

export default api
