<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()

const legendLayoutOptions = $ref([
  {
    label: '横向布局',
    value: 'horizontal'
  },
  { label: '纵向布局', value: 'vertical' }
])

const legendPositionOptions = $ref([
  { label: '置顶', value: 'top' },
  { label: '置底', value: 'bottom' },
  { label: '居左', value: 'left' },
  { label: '居右', value: 'right' }
])
</script>

<template>
  <n-form w-full label-placement="left" label-width="auto" size="large">
    <n-form-item label="标签偏移量">
      <n-input
        v-model:value="store.elementsList[props.index].cpt.options.label.offset"
        placeholder="标签偏移量"
      />
    </n-form-item>

    <n-form-item label="标签字体大小">
      <n-input-number
        v-model:value="
          store.elementsList[props.index].cpt.options.label.style.fontSize
        "
        :validator="(x: number) => x > 0"
      />
    </n-form-item>

    <n-form-item label="图例布局">
      <n-select
        v-model:value="
          store.elementsList[props.index].cpt.options.legend.layout
        "
        :options="legendLayoutOptions"
      />
    </n-form-item>

    <n-form-item label="图例位置">
      <n-select
        v-model:value="
          store.elementsList[props.index].cpt.options.legend.position
        "
        :options="legendPositionOptions"
      />
    </n-form-item>
  </n-form>
</template>

<style scoped></style>
