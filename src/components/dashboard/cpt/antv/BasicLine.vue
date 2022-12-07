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

const basicLineOptions: LineOptions = {
  data: store.elementsList[props.index].cpt.data,
  padding: 'auto',
  xField: 'Date',
  yField: 'scales',
  xAxis: {
    title: {
      text: '123'
    },
    tickCount: 5
  }
}

Object.assign(
  store.elementsList[props.index].cpt.options as LineOptions,
  basicLineOptions
)

const container = $ref()

let interval: any

let line: Line

onMounted(() => {
  line = new Line(container as HTMLElement, basicLineOptions)

  line.render()

  if (!interval) {
    setInterval(() => {
      line.changeData(store.elementsList[props.index]?.cpt.data)
    }, 700)
  }
})

onBeforeUnmount(() => {
  line.destroy()
  interval = null
})
</script>

<template>
  <div ref="container" h-full w-full></div>
</template>

<style scoped></style>
