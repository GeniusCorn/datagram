import { AxiosRequestConfig } from 'axios'
import http from '../utils/http'

class ApiService {
  api: string

  constructor() {
    this.api = '/api'
  }

  async getApi(url: string): Promise<AxiosRequestConfig> {
    return await http.post(this.api, { url })
  }
}

export default new ApiService()
