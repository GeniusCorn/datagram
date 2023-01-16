<script setup lang="ts">
import { useDataStore } from '@/store'

const store = useDataStore()

const props = defineProps<{
  index: number
}>()

const typeOptions = [
  {
    label: 'jitter',
    value: 'jitter'
  },
  {
    label: 'stack',
    value: 'stack'
  },
  {
    label: 'symmetric',
    value: 'symmetric'
  },
  {
    label: 'dodge',
    value: 'dodge'
  }
]
</script>

<template>
  <n-collapse accordion>
    <n-collapse-item title="图表" name="chart">
      <n-form label-width="auto">
        <n-form-item label="数据调整类型">
          <n-select
            v-model:value="store.elementsList[props.index].cpt.options.type"
            :options="typeOptions"
          />
        </n-form-item>
      </n-form>
    </n-collapse-item>

    <LabelConfig :index="props.index" />

    <AxisConfig :index="props.index" />
  </n-collapse>
</template>

<style scoped></style>
