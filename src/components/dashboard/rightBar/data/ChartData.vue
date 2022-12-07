<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()

const data = $ref(JSON.stringify(store.elementsList[props.index].cpt.data))

watch(
  () => data,
  () => {
    if (store.elementsList[props.index])
      store.elementsList[props.index].cpt.data = JSON.parse(data)
  }
)
</script>

<template>
  <n-space vertical>
    <n-input
      v-model:value="data"
      :autosize="{
        minRows: 3
      }"
      type="textarea"
      placeholder="文本内容"
    />
  </n-space>
</template>

<style scoped></style>
