<script setup lang="ts">
import { useDataStore } from '@/store/index'

const props = defineProps<{
  index: number
}>()

const store = useDataStore()
</script>

<template>
  <n-space vertical>
    <n-form-item label="X 轴">
      <n-input-number v-model:value="store.elementsList[props.index].drag.x" />
    </n-form-item>

    <n-form-item label="Y 轴">
      <n-input-number v-model:value="store.elementsList[props.index].drag.y" />
    </n-form-item>

    <n-form-item label="宽度">
      <n-input-number
        v-model:value="store.elementsList[props.index].drag.width"
      />
    </n-form-item>

    <n-form-item label="高度">
      <n-input-number
        v-model:value="store.elementsList[props.index].drag.height"
      />
    </n-form-item>
  </n-space>
</template>

<style scoped></style>
