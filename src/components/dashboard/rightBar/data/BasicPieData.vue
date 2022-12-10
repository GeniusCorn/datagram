<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()
</script>

<template>
  <n-form w-full label-placement="left" label-width="auto" size="large">
    <n-form-item label="扇形字段">
      <n-input
        v-model:value="store.elementsList[props.index].cpt.options.angleField"
      />
    </n-form-item>

    <n-form-item label="颜色字段">
      <n-input
        v-model:value="store.elementsList[props.index].cpt.options.colorField"
      />
    </n-form-item>
  </n-form>
</template>

<style scoped></style>
