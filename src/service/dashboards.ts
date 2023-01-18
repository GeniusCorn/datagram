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

  async updateDashboard(id: number, data: any): Promise<AxiosRequestConfig> {
    return await http.put(`${this.api}`, { id, data })
  }

  async renameDashboard(id: number, name: string): Promise<AxiosRequestConfig> {
    return await http.patch(`${this.api}`, { id, name })
  }

  async deleteDashboard(id: number): Promise<AxiosRequestConfig> {
    return await http.delete(`${this.api}/${id}`)
  }

  async toggleShareDashboard(
    id: number,
    value: boolean
  ): Promise<AxiosRequestConfig> {
    return await http.post(`${this.api}/share`, { id, value })
  }

  async getSharedDashboard(
    owner: number,
    dashboardName: string
  ): Promise<AxiosRequestConfig> {
    return await http.get(`${this.api}/share`, {
      params: { owner, dashboardName }
    })
  }
}

export default new DashboardsService()
