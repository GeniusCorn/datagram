import { AxiosRequestConfig } from 'axios'
import http from '../utils/http'
import { encode } from 'base-64'

class UsersService {
  api: string

  constructor() {
    this.api = '/users'
  }

  async getUser(account: string): Promise<AxiosRequestConfig> {
    return await http.get(`${this.api}/${account}`)
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

  async updatePhone(
    account: string,
    phone: string
  ): Promise<AxiosRequestConfig> {
    return await http.put(`${this.api}`, { account, phone })
  }

  async updatePassword(
    account: string,
    password: string,
    newPassword: string
  ): Promise<AxiosRequestConfig> {
    return await http.patch(`${this.api}`, { account, password, newPassword })
  }
}

export default new UsersService()
