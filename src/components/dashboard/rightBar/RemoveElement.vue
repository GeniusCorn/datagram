<script setup lang="ts">
import { useDataStore } from '@/store/index'

const props = defineProps<{
  index: number
}>()

const store = useDataStore()

function handlePositiveClick(index: number): void {
  store.removeElement(index)

  store.currentElement = -1
}

function handleNegativeClick(): void {}
</script>

<template>
  <n-popconfirm
    positive-text="确认"
    negative-text="取消"
    @positive-click="handlePositiveClick(props.index)"
    @negative-click="handleNegativeClick"
  >
    <template #trigger>
      <n-button type="error">删除该组件</n-button>
    </template>

    确认删除该组件？
  </n-popconfirm>
</template>

<style scoped></style>
