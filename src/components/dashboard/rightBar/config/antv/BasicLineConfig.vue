<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()
</script>

<template>
  <n-space vertical>
    <n-form-item label="曲线平滑">
      <n-switch
        v-model:value="store.elementsList[props.index].cpt.options.smooth"
      />
    </n-form-item>
  </n-space>
</template>

<style scoped></style>
