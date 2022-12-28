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
}

export default new DatasetsService()
