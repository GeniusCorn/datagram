<script setup lang="ts">
import { useDataStore } from '@/store'
import { Line, LineOptions } from '@antv/g2plot'

const store = useDataStore()

const data = [
  {
    Date: '2010-01',
    scales: 2002
  },
  {
    Date: '2010-02',
    scales: 1850
  },
  {
    Date: '2010-03',
    scales: 3000
  }
]

const props = defineProps<{
  index: number
}>()

store.elementsList[props.index].cpt.data = data

let options: LineOptions = {
  data: store.elementsList[props.index].cpt.data,

  padding: 'auto',
  xField: 'Date',
  yField: 'scales',
  smooth: false,
  stepType: '',
  label: false,
  point: {
    shape: 'circle',
    size: 2
  },
  xAxis: false,
  yAxis: false
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
