<script setup lang="ts">
import { useDataStore } from '@/store'
import { Line, LineOptions } from '@antv/g2plot'
import sampleData from '@/data/GDP.json'

const store = useDataStore()

const data = [...sampleData]

const props = defineProps<{
  index: number
}>()

store.elementsList[props.index].cpt.data = data

let options: LineOptions = {
  data: store.elementsList[props.index].cpt.data,

  xField: 'year',
  yField: 'gdp',
  seriesField: 'name',
  smooth: false,
  stepType: '',
  label: false,
  point: {
    shape: 'circle',
    size: 4
  },
  xAxis: false,
  yAxis: false,
  legend: false
}

if (Object.keys(store.elementsList[props.index].cpt.options).length === 0)
  Object.assign(
    store.elementsList[props.index].cpt.options as LineOptions,
    options
  )
else options = store.elementsList[props.index].cpt.options

const container = $ref()

let plot: Line

onMounted(() => {
  plot = new Line(container as HTMLElement, options)

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
