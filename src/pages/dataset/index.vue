<script setup lang="ts">
import router from '@/router'
import { Table, Database } from '@vicons/tabler'
import { Icon } from '@vicons/utils'
import { Component } from 'vue'
import DatasetsService from '@/service/datasets'

const account = $ref(localStorage.getItem('account') as string)
let res = await DatasetsService.getDatasetByOwner(account)
let datasets = $ref(res.data.data)

let fileData: any[] = $ref([])
let fileName: string = $ref('')
let fileID: number = $ref(0)

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

function selectDataset(index: number) {
  fileData = JSON.parse(datasets.at(index).data)
  fileName = datasets.at(index).name
  fileID = datasets.at(index).id
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
    clearSelectedFile()
    updateRes()
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

function clearSelectedFile() {
  fileData = []
  fileName = ''
  fileID = 0
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
  <n-layout>
    <n-layout-header>
      <Navbar />
    </n-layout-header>
    <n-layout-content>
      <div h="[calc(100vh-3rem)]" flex="~ row" overflow-hidden>
        <div w-60 h-full border="r gray" p-4 box-border flex="~ col">
          <div flex="~ row" justify-between items-center>
            <h2>数据集</h2>

            <n-dropdown :options="options" @select="handleSelect">
              <n-button icon-placement="right" type="primary" size="small">
                添加
              </n-button>
            </n-dropdown>
          </div>

          <div h-full overflow-y-auto overflow-x-hidden flex="~ col" gap-2>
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
            >
              <div>
                {{ index + 1 }}
              </div>
              <div w-full @click="selectDataset(index)">
                {{ dataset.name }}
              </div>
            </div>
          </div>
        </div>

        <div w-full overflow-auto>
          <n-card v-if="fileData.length > 0" title="数据预览">
            <template #header-extra>
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

            <n-table striped>
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
    </n-layout-content>
  </n-layout>
</template>
