<script setup lang="ts">
import router from '@/router'
import { Table, Database, CursorText, SquareX, Dots } from '@vicons/tabler'
import { Icon } from '@vicons/utils'
import { Component } from 'vue'
import DatasetsService from '@/service/datasets'

const account = $ref(localStorage.getItem('account') as string)
let res = await DatasetsService.getDatasetByOwner(account)
let datasets = $ref(res.data.data)

// preview dataset start
let fileIndex: number | undefined = $ref(undefined)

const fileData: any[] = $computed(() => {
  if (fileIndex !== undefined) return JSON.parse(datasets.at(fileIndex).data)
})
const fileID: number = $computed(() => datasets.at(fileIndex).id)

const datasetCreateTime = $computed(() =>
  new Date(datasets.at(fileIndex).create_time).toLocaleString('chinese', {
    timeZone: 'asia/Shanghai'
  })
)

function selectDataset(index: number) {
  fileIndex = index
}
// preview dataset end

// add dataset start
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

function handleAddDatasetButton(key: string | number) {
  switch (key) {
    case 'excel':
      router.push('/dataset/upload/excel')
      break

    default:
      break
  }
}
// add dataset end

// edit dataset end
let renameDatasetModal = $ref(false)

const dropdownOptions = [
  {
    label: '重命名',
    key: 'rename',
    icon: renderIcon(CursorText)
  },
  {
    label: '删除',
    key: 'delete',
    icon: renderIcon(SquareX)
  }
]

function handleMoreButtonSelect(key: string) {
  switch (key) {
    case 'rename':
      renameDatasetModal = true

      break

    case 'delete':
      deleteDataset(fileID)
      break

    default:
      break
  }
}

let newDatasetName: string = $ref('')

async function renameDataset(name: string) {
  if (validateDatasetName(name)) {
    const res = await DatasetsService.updateDatasetName(fileID, name)
    newDatasetName = ''
    if (res.data.code === 0) {
      window.$message?.success(res.data.message)

      updateRes()

      renameDatasetModal = false
    }
  }
  return false
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
  for (let i = 0; i < datasets.length; i += 1) {
    if (datasets[i].name === newDatasetName) {
      window.$message?.error('当前仪表盘名称已存在')

      return false
    }
  }

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
// edit dataset end

async function updateRes() {
  res = await DatasetsService.getDatasetByOwner(account)
  datasets = res.data.data
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

        <n-dropdown
          :options="options"
          trigger="click"
          @select="handleAddDatasetButton"
        >
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
          @click="selectDataset(index)"
        >
          <div>{{ index + 1 }}.</div>
          <div w-full>
            {{ dataset.name }}
          </div>
          <div text-right>
            <n-dropdown
              :options="dropdownOptions"
              trigger="click"
              @select="handleMoreButtonSelect"
            >
              <Icon>
                <Dots />
              </Icon>
            </n-dropdown>
          </div>
        </div>
      </div>
    </div>

    <div w-full overflow-auto>
      <n-card v-if="fileData?.length > 0" title="数据预览">
        <template #header-extra>
          <n-text mr-2>数据集创建时间：{{ datasetCreateTime }}</n-text>
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

  <!-- rename dataset -->
  <n-modal
    v-model:show="renameDatasetModal"
    :mask-closable="false"
    preset="dialog"
    :show-icon="false"
    title="重命名数据集"
    positive-text="确认"
    negative-text="取消"
    @positive-click="renameDataset(newDatasetName)"
  >
    <n-input v-model:value="newDatasetName" placeholder="请输入数据集名称" />
  </n-modal>
</template>

<route lang="yaml">
meta:
  layout: common
</route>
