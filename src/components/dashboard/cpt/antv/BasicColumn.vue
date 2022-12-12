<script setup lang="ts">
import { useDataStore } from '@/store'
import { Column, ColumnOptions } from '@antv/g2plot'

const store = useDataStore()

const data = [
  {
    type: '家具家电',
    sales: 38
  },
  {
    type: '粮油副食',
    sales: 52
  },
  {
    type: '生鲜水果',
    sales: 61
  }
]

const props = defineProps<{
  index: number
}>()

store.elementsList[props.index].cpt.data = data

const basicColumnOptions: ColumnOptions = {
  data: store.elementsList[props.index].cpt.data,

  xField: 'type',
  yField: 'sales',
  label: {
    position: 'middle'
  }
}

Object.assign(
  store.elementsList[props.index].cpt.options as ColumnOptions,
  basicColumnOptions
)

const container = $ref()

let plot: Column

onMounted(() => {
  plot = new Column(container as HTMLElement, basicColumnOptions)

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
