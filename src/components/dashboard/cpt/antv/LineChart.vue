<script setup lang="ts">
import { useDataStore } from '@/store'
import { Line, LineOptions } from '@antv/g2plot'
import sampleData from '@/data/fireworks-sales.json'

const props = defineProps<{
  index: number
}>()

// manually update chart data when data is updated
defineExpose({ updateData })

const store = useDataStore()

const chart = $ref()
let plot: Line

onMounted(() => {
  renderChart()

  // automatically update chart options when options updated
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

function renderChart() {
  const options = initChartOptions()

  plot = new Line(chart as HTMLElement, options)
  plot.render()
}

function initChartOptions() {
  // initial chart options
  let options: LineOptions = {
    data: sampleData,

    stepType: '',
    xField: 'Date',
    yField: 'scales',
    smooth: false,
    lineStyle: {
      lineWidth: 2,
      strokeOpacity: 1
    },
    point: {
      shape: 'circle',
      size: 4,
      style: {}
    },

    label: false,
    xAxis: false,
    yAxis: false,
    legend: false
  }

  // check if it is a new chart, if it is true assign initial options
  if (Object.keys(store.elementsList[props.index].cpt.options).length === 0) {
    store.elementsList[props.index].cpt.data = sampleData
    Object.assign(
      store.elementsList[props.index].cpt.options as LineOptions,
      options
    )
  } else {
    options = store.elementsList[props.index].cpt.options
  }

  return options
}

function updateData() {
  plot.changeData(store.elementsList[props.index]?.cpt.data)
}
</script>

<template>
  <div ref="chart" h-full w-full></div>
</template>

<style scoped></style>
