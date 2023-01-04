<script setup lang="ts">
import router from '@/router'
import { Table, Database } from '@vicons/tabler'
import { Icon } from '@vicons/utils'
import { Component } from 'vue'
import DatasetsService from '@/service/datasets'

const account = $ref(localStorage.getItem('account') as string)
let res = await DatasetsService.getDatasetByOwner(account)
let datasets = $ref(res.data.data)

let fileIndex: number | undefined = $ref(undefined)

const options = $ref([
  {
    label: 'Excel 数据集',
    key: 'excel',
    icon: renderIcon(Table)
  },
  {
    label: 'API 数据集',
    key: 'api',
    icon: renderIcon(Database)
  }
])

const fileData: any[] = $computed(() => {
  if (fileIndex !== undefined) return JSON.parse(datasets.at(fileIndex).data)
})
let fileName: string = $ref(datasets.at(fileIndex).name)
const fileID: number = $computed(() => datasets.at(fileIndex).id)

const datasetCreateTime = $computed(() =>
  new Date(datasets.at(fileIndex).create_time).toLocaleString('chinese', {
    timeZone: 'asia/Shanghai'
  })
)

function selectDataset(index: number, name: string) {
  fileIndex = index
  fileName = name
}

async function updateDatasetName(name: string) {
  if (validateDatasetName(name)) {
    const res = await DatasetsService.updateDatasetName(fileID, name)
    if (res.data.code === 0) {
      window.$message?.success(res.data.message)

      updateRes()
    }
  }
}

async function deleteDataset(id: number) {
  const res = await DatasetsService.deleteDataset(id)
  if (res.data.code === 0) {
    window.$message?.success(res.data.message)
    updateRes()

    datasets.length > 0 ? (fileIndex = undefined) : (fileIndex = 0)
  }
}

function validateDatasetName(name: string): boolean {
  if (name === '') {
    window.$message?.error('数据集名称不可为空')
    return false
  }

  if (name.length > 10) {
    window.$message?.error('数据集名称不可大于十个字符')
    return false
  }

  return true
}

async function updateRes() {
  res = await DatasetsService.getDatasetByOwner(account)
  datasets = res.data.data
}

function handleSelect(key: string | number) {
  switch (key) {
    case 'excel':
      router.push('/dataset/upload/excel')
      break

    default:
      break
  }
}

function renderIcon(icon: Component) {
  return () => {
    return h(Icon, null, {
      default: () => h(icon)
    })
  }
}
</script>

<template>
  <div h="[calc(100vh-3rem)]" flex="~ row" overflow-hidden>
    <div w-60 h-full border="r gray" p-4 box-border flex="~ col" gap-4>
      <div flex="~ row" justify-between items-center>
        <h2>数据集</h2>

        <n-dropdown :options="options" @select="handleSelect">
          <n-button icon-placement="right" type="primary" size="small">
            添加
          </n-button>
        </n-dropdown>
      </div>

      <div h-full overflow-y-auto overflow-x-hidden flex="~ col" gap-4>
        <div
          v-for="(dataset, index) in datasets"
          :key="index"
          flex="~ row"
          gap-2
          hover="text-[#36ad2a]"
          cursor-pointer
          transition
          duration-200
          ease-in-out
          :class="{ 'text-[#36ad2a]': index === fileIndex }"
        >
          <div>{{ index + 1 }}.</div>
          <div w-full @click="selectDataset(index, dataset.name)">
            {{ dataset.name }}
          </div>
        </div>
      </div>
    </div>

    <div w-full overflow-auto>
      <n-card v-if="fileData?.length > 0" title="数据预览">
        <template #header-extra>
          <n-text mr-2>数据集创建时间：{{ datasetCreateTime }}</n-text>
          <n-button-group>
            <n-input v-model:value="fileName" autosize clearable min-w-40 />
            <n-button type="info" @click="updateDatasetName(fileName)"
              >更新</n-button
            >
            <n-popconfirm
              positive-text="确认"
              negative-text="取消"
              @positive-click="deleteDataset(fileID)"
            >
              <template #trigger>
                <n-button type="error">删除</n-button>
              </template>
              确认要删除该数据集？
            </n-popconfirm>
          </n-button-group>
        </template>

        <n-table size="small" :bordered="true" striped>
          <thead>
            <tr>
              <th v-for="(head, index) in fileData.at(0)" :key="index">
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

<route lang="yaml">
meta:
  layout: common
</route>
