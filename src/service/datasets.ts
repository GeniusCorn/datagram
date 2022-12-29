import { AxiosRequestConfig } from 'axios'
import http from '../utils/http'

class DatasetsService {
  api: string

  constructor() {
    this.api = '/datasets'
  }

  async createDataset(
    data: any[],
    account: string,
    datasetName: string
  ): Promise<AxiosRequestConfig> {
    return await http.post(`${this.api}`, { data, account, datasetName })
  }

  async getDatasetByOwner(account: string): Promise<AxiosRequestConfig> {
    return await http.get(`${this.api}`, { params: { account } })
  }

  async updateDatasetName(
    id: number,
    name: string
  ): Promise<AxiosRequestConfig> {
    return await http.patch(`${this.api}`, { id, name })
  }

  async deleteDataset(id: number): Promise<AxiosRequestConfig> {
    return await http.delete(`${this.api}/${id}`)
  }
}

export default new DatasetsService()
