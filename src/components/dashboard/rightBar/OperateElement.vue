<script setup lang="ts">
import { useDataStore } from '@/store/index'
import { v4 } from 'uuid'

const props = defineProps<{
  index: number
}>()

const store = useDataStore()

function copyElement(index: number): void {
  const drag = {
    x: store.elementsList[index].drag.x + 30,
    y: store.elementsList[index].drag.y + 30,
    width: store.elementsList[index].drag.width,
    height: store.elementsList[index].drag.height,
    isActive: false
  }

  const cpt = {
    type: store.elementsList[index].cpt.type,
    options: JSON.parse(JSON.stringify(store.elementsList[index].cpt.options)),
    data: JSON.parse(JSON.stringify(store.elementsList[index].cpt.data))
  }

  store.elementsList.push({
    id: v4(),
    drag,
    cpt
  })
}

function confirmDeleteElement(index: number): void {
  store.removeElement(index)

  store.currentElement = -1
}
</script>

<template>
  <n-button-group w-max>
    <n-button type="info" w-full @click="copyElement(props.index)"
      >复制</n-button
    >

    <n-popconfirm
      positive-text="确认"
      negative-text="取消"
      @positive-click="confirmDeleteElement(props.index)"
    >
      <template #trigger>
        <n-button w-full type="error">删除</n-button>
      </template>

      确认删除该组件？
    </n-popconfirm>
  </n-button-group>

  <br />
</template>

<style scoped></style>
