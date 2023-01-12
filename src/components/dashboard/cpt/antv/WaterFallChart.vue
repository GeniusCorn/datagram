<script setup lang="ts">
import { useDataStore } from '@/store'
import { Waterfall, WaterfallOptions } from '@antv/g2plot'
import sampleData from '@/data/types-sales-another.json'

const store = useDataStore()

const props = defineProps<{
  index: number
}>()

// manually update chart data when data is updated
defineExpose({ updateData })

const chart = $ref()
let plot: Waterfall

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

  plot = new Waterfall(chart as HTMLElement, options)
  plot.render()
}

function initChartOptions() {
  // initial chart options
  let options: WaterfallOptions = {
    data: sampleData,

    xField: 'type',
    yField: 'money',
    labelMode: 'difference',
    total: false,
    leaderLine: false,

    label: false,
    legend: false
  }

  // check if it is a new chart, if it is true assign initial options
  if (Object.keys(store.elementsList[props.index].cpt.options).length === 0) {
    store.elementsList[props.index].cpt.data = sampleData
    Object.assign(
      store.elementsList[props.index].cpt.options as WaterfallOptions,
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
