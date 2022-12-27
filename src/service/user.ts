import { AxiosRequestConfig } from 'axios'
import http from '../utils/http'
import { encode } from 'base-64'

class UserService {
  api: string

  constructor() {
    this.api = '/user'
  }

  async register(
    account: string,
    password: string
  ): Promise<AxiosRequestConfig> {
    return await http.post(`${this.api}`, {
      account: encode(account),
      password: encode(password)
    })
  }
}

export default new UserService()
