<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()

const titlePositionOptions = $ref([
  {
    label: '居左',
    value: 'start'
  },
  {
    label: '居中',
    value: 'center'
  },
  {
    label: '居右',
    value: 'end'
  }
])

const xAxisPositionOptions = $ref([
  {
    label: '置顶',
    value: 'top'
  },
  {
    label: '置底',
    value: 'bottom'
  },
  {
    label: '居左',
    value: 'left'
  },
  {
    label: '居右',
    value: 'right'
  }
])

const stepTypeOptions = $ref([
  {
    label: '无',
    value: undefined
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
  <n-form w-full label-placement="left" label-width="auto" size="large">
    <n-form-item label="x 轴标题">
      <n-input
        v-model:value="
          store.elementsList[props.index].cpt.options.xAxis.title.text
        "
        placeholder="x 轴标题"
      />
    </n-form-item>

    <n-form-item label="x 轴标题位置">
      <n-select
        v-model:value="
          store.elementsList[props.index].cpt.options.xAxis.title.position
        "
        :options="titlePositionOptions"
      />
    </n-form-item>

    <n-form-item label="x 轴标题字体大小">
      <n-input-number
        v-model:value="
          store.elementsList[props.index].cpt.options.xAxis.title.style.fontSize
        "
        :validator="(x:number)=>x > 0"
      />
    </n-form-item>

    <n-form-item label="x 轴位置">
      <n-select
        v-model:value="
          store.elementsList[props.index].cpt.options.xAxis.position
        "
        :options="xAxisPositionOptions"
      />
    </n-form-item>

    <n-form-item label="阶梯类型">
      <n-select
        v-model:value="store.elementsList[props.index].cpt.options.stepType"
        placeholder="无"
        :options="stepTypeOptions"
      />
    </n-form-item>

    <n-form-item label="曲线平滑">
      <n-switch
        v-model:value="store.elementsList[props.index].cpt.options.smooth"
      />
    </n-form-item>
  </n-form>
</template>

<style scoped></style>
