<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()
</script>

<template>
  <n-form w-full label-placement="left" label-width="auto" size="large">
    <n-form-item label="x 方向字段">
      <n-input
        v-model:value="store.elementsList[props.index].cpt.options.xField"
      />
    </n-form-item>

    <n-form-item label="y 方向字段">
      <n-input
        v-model:value="store.elementsList[props.index].cpt.options.yField"
      />
    </n-form-item>
  </n-form>
</template>

<style scoped></style>
