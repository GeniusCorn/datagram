<script setup lang="ts">
import { useDataStore } from '@/store'

const props = defineProps<{
  index: number
}>()

const store = useDataStore()

const textOptions = {
  bold: false,
  fontSize: 16,
  lineHeight: 30,
  textAlign: 'start'
}

if (Object.keys(store.elementsList[props.index].cpt.options).length === 0)
  Object.assign(store.elementsList[props.index].cpt.options, textOptions)

if (Object.keys(store.elementsList[props.index].cpt.data).length === 0)
  store.elementsList[props.index].cpt.data = '新建文本'
</script>

<template>
  <div
    w-full
    h-full
    :style="{
      fontSize: `${store.elementsList[index].cpt.options.fontSize}px`,
      lineHeight: `${store.elementsList[index].cpt.options.lineHeight}px`,
      textAlign: store.elementsList[index].cpt.options.textAlign
    }"
  >
    {{ store.elementsList[index].cpt.data }}
  </div>
</template>

<style scoped></style>
