<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()
</script>

<template>
  <n-form w-full label-placement="left" label-width="auto" size="medium">
    <n-form-item label="弧度字段">
      <n-input
        v-model:value="store.elementsList[props.index].cpt.options.angleField"
      />
    </n-form-item>

    <n-form-item label="数据字段">
      <n-input
        v-model:value="store.elementsList[props.index].cpt.options.colorField"
      />
    </n-form-item>
  </n-form>
</template>

<style scoped></style>
