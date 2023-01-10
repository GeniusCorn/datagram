<script setup lang="ts">
import { useDataStore } from '@/store'
import { Column, ColumnOptions } from '@antv/g2plot'
import sampleData from '@/data/types-sales.json'

const store = useDataStore()

const data = [...sampleData]

const props = defineProps<{
  index: number
}>()

store.elementsList[props.index].cpt.data = data

let options: ColumnOptions = {
  data: store.elementsList[props.index].cpt.data,

  xField: 'type',
  yField: 'sales',
  label: false,
  xAxis: false,
  yAxis: false
}

if (Object.keys(store.elementsList[props.index].cpt.options).length === 0)
  Object.assign(
    store.elementsList[props.index].cpt.options as ColumnOptions,
    options
  )

options = store.elementsList[props.index].cpt.options

const container = $ref()

let plot: Column

onMounted(() => {
  plot = new Column(container as HTMLElement, options)

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
