<script setup lang="ts">
import { useDataStore } from '@/store'

const store = useDataStore()

const props = defineProps<{
  index: number
}>()

const stepTypeOptions = $ref([
  {
    label: '无',
    value: ''
  },
  {
    label: 'hv',
    value: 'hv'
  },
  {
    label: 'vh',
    value: 'vh'
  },
  {
    label: 'hvh',
    value: 'hvh'
  },
  {
    label: 'vhv',
    value: 'vhv'
  }
])
</script>

<template>
  <n-collapse accordion>
    <n-collapse-item title="图表" name="chart">
      <n-form w-full label-width="auto" size="medium">
        <n-form-item label="阶梯类型">
          <n-select
            v-model:value="store.elementsList[props.index].cpt.options.stepType"
            placeholder="无"
            :options="stepTypeOptions"
            :default-value="undefined"
          />
        </n-form-item>

        <n-form-item
          v-if="store.elementsList[props.index].cpt.options.stepType === ''"
          label="曲线平滑"
          label-placement="left"
        >
          <n-switch
            v-model:value="store.elementsList[props.index].cpt.options.smooth"
          />
        </n-form-item>
      </n-form>
    </n-collapse-item>

    <LineStyleConfig :index="props.index" />

    <LabelConfig :index="props.index" />

    <AxisConfig :index="props.index" />

    <template
      v-if="store.elementsList[props.index].cpt.type === 'MultipleLineChart'"
    >
      <LegendConfig :index="props.index" />
    </template>
  </n-collapse>
</template>

<style scoped></style>
