<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()
</script>

<template>
  <div>
    <n-form-item label="图片链接">
      <n-input
        v-model:value="store.elementsList[props.index].cpt.data"
        type="textarea"
        placeholder="图片链接"
      />
    </n-form-item>
  </div>
</template>

<style scoped></style>
