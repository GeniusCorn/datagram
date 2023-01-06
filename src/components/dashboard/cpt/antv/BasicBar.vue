<script setup lang="ts">
import { useDataStore } from '@/store'
import { Bar, BarOptions } from '@antv/g2plot'

const store = useDataStore()

const data = [
  { 地区: '华东', 销售额: 46 },
  { 地区: '中南', 销售额: 41 },
  { 地区: '东北', 销售额: 26 },
  { 地区: '华北', 销售额: 24 },
  { 地区: '西南', 销售额: 13 },
  { 地区: '西北', 销售额: 81 }
]

const props = defineProps<{
  index: number
}>()

store.elementsList[props.index].cpt.data = data

let options: BarOptions = {
  data: store.elementsList[props.index].cpt.data,

  // forceFit: true,
  xField: '销售额',
  yField: '地区',
  label: false,
  xAxis: false,
  yAxis: false
}

if (Object.keys(store.elementsList[props.index].cpt.options).length === 0)
  Object.assign(
    store.elementsList[props.index].cpt.options as BarOptions,
    options
  )

options = store.elementsList[props.index].cpt.options

const container = $ref()

let plot: Bar

onMounted(() => {
  plot = new Bar(container as HTMLElement, options)

  plot.render()

  watch(
    () => store.elementsList[props.index]?.cpt.options,
    () => {
      plot.update(store.elementsList[props.index]?.cpt.options)
    },
    {
      deep: true
    }
  )
})

onBeforeUnmount(() => {
  plot.destroy()
})

function updateData() {
  plot.changeData(store.elementsList[props.index]?.cpt.data)
}

defineExpose({ updateData })
</script>

<template>
  <div ref="container" h-full w-full></div>
</template>

<style scoped></style>
