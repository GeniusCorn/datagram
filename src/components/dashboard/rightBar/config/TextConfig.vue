<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()

const textAlignOptions = $ref([
  {
    label: '左',
    value: 'start'
  },
  {
    label: '右',
    value: 'end'
  },
  {
    label: '居中',
    value: 'center'
  },
  {
    label: '绝对',
    value: 'justify'
  }
])
</script>

<template>
  <n-form w-full label-width="auto" size="medium">
    <n-form-item label="字体大小">
      <n-input-number
        v-model:value="store.elementsList[props.index].cpt.options.fontSize"
        w-full
        :validator="(x: number) => x > 0"
        placeholder="请输入数字"
      />
    </n-form-item>

    <n-form-item label="行高">
      <n-input-number
        v-model:value="store.elementsList[props.index].cpt.options.lineHeight"
        w-full
        :validator="(x: number) => x > 0"
        placeholder="请输入数字"
      />
    </n-form-item>

    <n-form-item label="对齐方式">
      <n-select
        v-model:value="store.elementsList[props.index].cpt.options.textAlign"
        :options="textAlignOptions"
      />
    </n-form-item>
  </n-form>
</template>

<style scoped></style>
