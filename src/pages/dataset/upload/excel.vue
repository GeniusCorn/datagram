<script setup lang="ts">
import { Icon } from '@vicons/utils'
import { AlertCircle, File } from '@vicons/tabler'
import { UploadFileInfo } from 'naive-ui/es/upload'
import { excelToJson } from '@/utils/xlsx'
import DatasetsService from '@/service/datasets'
import router from '@/router'

let fileData: any[] = $ref([])
let customFileName = $ref('')

async function handleFinish({ file }: { file: UploadFileInfo }) {
  const fileName: string | undefined = file.file?.name
  if (fileName) {
    if (checkFileType(fileName)) {
      fileData = await excelToJson(file.file as File)
      customFileName = fileName.split('.').at(0) as string
    }
  }
}

function handleRemove() {
  fileData.splice(0, fileData.length)
  customFileName = ''
}

function checkFileType(fileName: string): boolean {
  const type = fileName.split('.').at(-1)

  if (type !== 'xlsx') {
    window.$message?.error('该文件类型不支持，请上传 xlsx 格式的文件')
    return false
  }

  return true
}

async function uploadData() {
  const account = localStorage.getItem('account') as string

  const res = await DatasetsService.createDataset(
    fileData,
    account,
    customFileName
  )

  if (res.data.code === 0) {
    window.$message?.success(res.data.message)

    fileData = []

    router.push('/dataset')
  } else {
    window.$message?.error(res.data.message)
  }
}
</script>

<template>
  <div h="[calc(100vh-3rem)]" flex="~ row" max-w-screen>
    <div w-60 h-full border="r gray" p-4 box-border>
      <div flex="~ col" gap-4>
        <div flex="~ row" justify-between items-center>
          <h2>选择 Excel 文件</h2>

          <n-popover trigger="hover">
            <template #trigger>
              <Icon>
                <AlertCircle />
              </Icon>
            </template>

            <div>
              <div>1. Excel 文件中不能存在合并单元格；</div>
              <div>2. Excel 文件的第一行为标题行，不能为空，不能为日期型；</div>
              <div>3. 文件大小请确保在 500M 以内。</div>
            </div>
          </n-popover>
        </div>

        <div flex="~ col" gap-4 h-full>
          <n-upload
            directory-dnd
            :max="1"
            @before-upload="handleFinish"
            @remove="handleRemove"
          >
            <n-upload-dragger>
              <div style="margin-bottom: 12px">
                <n-icon size="48" :depth="3">
                  <File />
                </n-icon>
              </div>

              <n-text style="font-size: 16px">
                点击或者拖动文件到该区域来上传
              </n-text>

              <n-p depth="3" style="margin: 8px 0 0 0">
                请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
              </n-p>
            </n-upload-dragger>
          </n-upload>

          <div v-if="fileData.length > 0" flex="~ col" gap-2>
            <n-input
              v-model:value="customFileName"
              clearable
              placeholder="请输入数据集名称"
            />

            <n-button type="primary" w-full @click="uploadData"
              >确认上传</n-button
            >
          </div>
        </div>
      </div>
    </div>

    <div w-full h-full overflow-auto>
      <n-card v-if="fileData.length > 0" title="数据预览">
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
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: upload
</route>
