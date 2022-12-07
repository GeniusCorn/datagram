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
      <n-input-number
        v-model:value="store.elementsList[props.index].drag.x"
        clearable
      />
    </n-form-item>

    <n-form-item label="Y 轴">
      <n-input-number
        v-model:value="store.elementsList[props.index].drag.y"
        clearable
      />
    </n-form-item>

    <n-form-item label="宽度">
      <n-input-number
        v-model:value="store.elementsList[props.index].drag.width"
        clearable
      />
    </n-form-item>

    <n-form-item label="高度">
      <n-input-number
        v-model:value="store.elementsList[props.index].drag.height"
        clearable
      />
    </n-form-item>
  </n-space>
</template>

<style scoped></style>
