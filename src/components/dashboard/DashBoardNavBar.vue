<script setup lang="ts">
import { Icon } from '@vicons/utils'
import { ChevronLeft } from '@vicons/tabler'
import { useDataStore } from '@/store'
import { useMessage } from 'naive-ui'

const message = useMessage()

const store = useDataStore()

function saveElementsListToLocalStorage(): void {
  if (store.elementsList.length === 0) {
    message.error(`画布为空，无法保存`)
    return
  }

  const value = JSON.stringify(store.elementsList)

  localStorage.clear()
  localStorage.setItem('elementsList', value)

  message.success(`保存成功`)
}

function clearCanvas(): void {
  if (store.elementsList.length === 0) {
    message.error(`画布已经为空`)
    return
  }

  localStorage.clear()

  for (let i = store.elementsList.length; i >= 0; i -= 1) {
    store.removeElement(i)
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
    <div>
      <Icon>
        <ChevronLeft />
      </Icon>
    </div>

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

        <n-button quaternary>预览</n-button>
        <n-button type="info">导出</n-button>
        <n-button type="primary" @click="saveElementsListToLocalStorage"
          >保存</n-button
        >
      </n-space>
    </div>
  </div>
</template>

<style scoped></style>
