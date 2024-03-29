<script setup lang="ts">
import router from '@/router/index'
import { Icon } from '@vicons/utils'
import { ChevronLeft } from '@vicons/tabler'
import { useDataStore } from '@/store'
import html2canvas from 'html2canvas'
import { useRoute } from 'vue-router'
import DashboardsService from '@/service/dashboards'

const route = useRoute()
const id = parseInt(route.path.split('/').at(-1) as string)

const emit = defineEmits(['export'])

const store = useDataStore()

let showSaveDashboardModal = $ref(false)

function backToDashboard() {
  const isSaved =
    localStorage.getItem('elementsList') === JSON.stringify(store.elementsList)

  if (isSaved) {
    router.push('/dashboard')
  } else {
    showSaveDashboardModal = true
  }
}

function resetElementsList() {
  store.elementsList = JSON.parse(
    localStorage.getItem('elementsList') as string
  )

  router.push('/dashboard')
}

function clearCanvas(): void {
  if (store.elementsList.length === 0) {
    window.$message?.error(`画布已经为空，无法清空`)
    return
  }

  localStorage.removeItem('elementsList')

  for (let i = store.elementsList.length; i >= 0; i -= 1) {
    store.removeElement(i)
  }
}

function pushRouterToPreview(): void {
  if (store.elementsList.length === 0) {
    window.$message?.error(`画布为空，无法预览`)
    return
  }

  saveElementsListToLocalStorage()

  const url = `${window.location.href
    .split('#')
    .at(0)}#/dashboard/canvas/preview`

  window.open(url, '_blank')
}

function exportCanvas(): void {
  if (store.elementsList.length === 0) {
    window.$message?.error(`画布为空，无法导出`)
    return
  }

  emit('export')

  setTimeout(() => {
    const canvas: HTMLElement | null = document.querySelector(
      '#canvas'
    ) as HTMLElement

    html2canvas(canvas as HTMLElement, {
      allowTaint: true,
      useCORS: true
    }).then((canvas) => {
      const canvasData = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = canvasData
      link.download = '我的大屏.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }, 200)
}

async function saveElementsListToLocalStorage(): Promise<void> {
  const value = JSON.stringify(store.elementsList)

  localStorage.removeItem('elementsList')
  localStorage.setItem('elementsList', value)

  const res = await DashboardsService.updateDashboard(id, value)

  if (res.data.code === 0) {
    window.$message?.success(res.data.message)
  }
}
</script>

<template>
  <div
    flex="~ row"
    justify-between
    items-center
    border="b gray"
    box-border
    h-12
    px-10
  >
    <n-button text @click="backToDashboard">
      <Icon>
        <ChevronLeft />
      </Icon>
    </n-button>

    <div>
      <n-space>
        <n-popconfirm
          positive-text="确认"
          negative-text="取消"
          @positive-click="clearCanvas"
        >
          <template #trigger>
            <n-button quaternary>清空</n-button>
          </template>
          确认清空画布？
        </n-popconfirm>

        <n-button quaternary @click="pushRouterToPreview">预览</n-button>
        <n-button type="info" @click="exportCanvas">导出</n-button>
        <n-button type="primary" @click="saveElementsListToLocalStorage"
          >保存</n-button
        >
      </n-space>
    </div>
  </div>

  <!-- save dashboard modal -->
  <n-modal
    v-model:show="showSaveDashboardModal"
    :mask-closable="false"
    preset="dialog"
    :show-icon="false"
    title="仪表盘已变动，是否保存"
    positive-text="保存"
    negative-text="不保存"
    @positive-click="saveElementsListToLocalStorage"
    @negative-click="resetElementsList"
  >
    <n-text>如果未保存，仪表盘的变更将会丢失！</n-text>
  </n-modal>
</template>

<style scoped></style>
