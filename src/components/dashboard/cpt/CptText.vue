<script setup lang="ts">
import { useDataStore } from '@/store'
import {
  Option,
  textOptions
} from '@/components/dashboard/rightBar/options/textOptions'

const props = defineProps<{
  index: number
}>()

const store = useDataStore()

Object.assign(
  store.elementsList[props.index].cpt.options as Option,
  textOptions
)

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
