import { AxiosRequestConfig } from 'axios'
import http from '../utils/http'
import { encode } from 'base-64'

class SessionService {
  api: string

  constructor() {
    this.api = '/session'
  }

  async login(account: string, password: string): Promise<AxiosRequestConfig> {
    return await http.post(`${this.api}`, {
      account: encode(account),
      password: encode(password)
    })
  }
}

export default new SessionService()
