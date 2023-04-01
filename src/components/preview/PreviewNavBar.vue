<script setup lang="ts">
import { useDataStore } from '@/store'
import html2canvas from 'html2canvas'

const emit = defineEmits(['export'])

const store = useDataStore()

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
</script>

<template>
  <div
    flex="~ row row-reverse"
    justify-between
    items-center
    box-border
    h-12
    px-10
    w-full
    fixed
  >
    <n-button type="info" z-100 @click="exportCanvas">导出</n-button>
  </div>
</template>

<style scoped></style>
