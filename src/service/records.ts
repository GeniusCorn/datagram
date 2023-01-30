import { AxiosRequestConfig } from 'axios'
import http from '../utils/http'

class RecordsService {
  api: string

  constructor() {
    this.api = '/records'
  }

  async getAllRecords(): Promise<AxiosRequestConfig> {
    return await http.get(this.api)
  }
}

export default new RecordsService()
