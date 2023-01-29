<script setup lang="ts">
import router from '@/router'
import ApiService from '@/service/api'
import DatasetsService from '@/service/datasets'

let fileData: any[] = $ref([])

const api: string = $ref('')

async function getData() {
  clearData()

  if (validateApi()) {
    const res = await ApiService.getApi(api)

    if (res.data.code === 0) {
      window.$message?.success(res.data.message)
      fileData = res.data.data
    } else {
      window.$message?.error(res.data.message)
    }
  }
}

function validateApi(): boolean {
  if (api.length === 0) {
    window.$message?.error('请输入接口地址')
    return false
  }

  return true
}

const customFileName: string = $ref('')

async function uploadData() {
  if (validateFileName()) {
    const account = localStorage.getItem('account') as string

    const res = await DatasetsService.createDataset(
      fileData,
      account,
      customFileName
    )

    if (res.data.code === 0) {
      window.$message?.success(res.data.message)

      clearData()

      router.push('/dataset')
    } else {
      window.$message?.error(res.data.message)
    }
  }
}

function validateFileName(): boolean {
  if (customFileName.length === 0) {
    window.$message?.error('请输入数据集名称')
    return false
  }

  return true
}

function clearData() {
  fileData = []
}
</script>

<template>
  <div h="[calc(100vh-3rem)]" flex="~ row" max-w-screen>
    <div w-60 h-full border="r gray" p-4 box-border>
      <div flex="~ col" gap-4>
        <div flex="~ row" justify-between items-center>
          <h2>接口地址</h2>
        </div>

        <n-input
          v-model:value="api"
          type="textarea"
          placeholder="请输入接口地址"
        />

        <n-button type="primary" @click="getData">获取数据</n-button>

        <template v-if="fileData.length > 0">
          <n-input
            v-model:value="customFileName"
            placeholder="请输入数据集名称"
          />

          <n-button type="primary" @click="uploadData">确认上传</n-button>
        </template>
      </div>
    </div>

    <div w-full h-full overflow-auto>
      <n-card v-if="fileData.length > 0" title="数据预览">
        <n-table striped>
          <thead>
            <tr>
              <th
                v-for="(head, index) in Object.keys(fileData.at(0))"
                :key="index"
              >
                {{ head }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(column, index) in fileData.slice(1)" :key="index">
              <td v-for="(data, i) in column" :key="i">
                {{ data }}
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-card>
    </div>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: upload
</route>
