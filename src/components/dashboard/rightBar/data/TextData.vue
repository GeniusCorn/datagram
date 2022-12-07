<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()
</script>

<template>
  <n-space vertical>
    <n-input
      v-model:value="store.elementsList[props.index].cpt.data.value"
      type="textarea"
      placeholder="文本内容"
    />
  </n-space>
</template>

<style scoped></style>
