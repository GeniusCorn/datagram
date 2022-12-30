import { AxiosRequestConfig } from 'axios'
import http from '../utils/http'

class DashboardsService {
  api: string

  constructor() {
    this.api = '/dashboards'
  }

  async createDashboard(
    data: any[],
    account: string,
    dashboardName: string
  ): Promise<AxiosRequestConfig> {
    return await http.post(`${this.api}`, { data, account, dashboardName })
  }

  async getDashboardByOwner(account: string): Promise<AxiosRequestConfig> {
    return await http.get(`${this.api}`, { params: { account } })
  }

  async deleteDashboard(id: number): Promise<AxiosRequestConfig> {
    return await http.delete(`${this.api}/${id}`)
  }
}

export default new DashboardsService()
