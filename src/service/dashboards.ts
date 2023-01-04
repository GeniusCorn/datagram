import { AxiosRequestConfig } from 'axios'
import http from '../utils/http'

class DashboardsService {
  api: string

  constructor() {
    this.api = '/dashboards'
  }

  async createDashboard(
    account: string,
    dashboardName: string
  ): Promise<AxiosRequestConfig> {
    return await http.post(`${this.api}`, { account, dashboardName })
  }

  async getDashboardByOwner(account: string): Promise<AxiosRequestConfig> {
    return await http.get(`${this.api}`, { params: { account } })
  }

  async getDashboardByID(ID: number): Promise<AxiosRequestConfig> {
    return await http.get(`${this.api}`, { params: { ID } })
  }

  async renameDashboard(id: number, name: string): Promise<AxiosRequestConfig> {
    return await http.patch(`${this.api}`, { id, name })
  }

  async deleteDashboard(id: number): Promise<AxiosRequestConfig> {
    return await http.delete(`${this.api}/${id}`)
  }
}

export default new DashboardsService()
