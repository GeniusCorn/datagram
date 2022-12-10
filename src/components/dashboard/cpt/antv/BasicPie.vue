<script setup lang="ts">
import { useDataStore } from '@/store'
import { Pie, PieOptions } from '@antv/g2plot'

const store = useDataStore()

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 }
]

const props = defineProps<{
  index: number
}>()

store.elementsList[props.index].cpt.data = data

const basicLineOptions: PieOptions = {
  data: store.elementsList[props.index].cpt.data,
  angleField: 'value',
  colorField: 'type',
  label: {
    offset: '-30%',
    content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    style: {
      fontSize: 14
    }
  },
  legend: {
    layout: 'vertical',
    position: 'right'
  }
}

Object.assign(
  store.elementsList[props.index].cpt.options as PieOptions,
  basicLineOptions
)

const container = $ref()

let plot: Pie

onMounted(() => {
  plot = new Pie(container as HTMLElement, basicLineOptions)

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
