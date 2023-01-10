<script setup lang="ts">
import { useDataStore } from '@/store'
import { Bar, BarOptions } from '@antv/g2plot'
import sampleData from '@/data/regions-sales.json'

const store = useDataStore()

const data = [...sampleData]

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
