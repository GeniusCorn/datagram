<script setup lang="ts">
import { Icon } from '@vicons/utils'
import { ChartPie, Map2, Components } from '@vicons/tabler'
import { useDataStore } from '@/store/index'

const store = useDataStore()

let showChartPanel: boolean = $ref(false)
let showComponentPanel: boolean = $ref(false)

let selected: string | undefined = $ref()

function onSubmitChart(chart: string) {
  showChartPanel = false
  selected = chart
}

function onSubmitComponent(component: string) {
  showComponentPanel = false
  selected = component

  store.addElement(component, { text: '123' })
}
</script>

<template>
  <div flex="~ col" bg="[#f8f9fa]" w-20 h-full items-center gap-4>
    <div
      flex="~ col"
      gap-1
      items-center
      hover:text-gray
      cursor-pointer
      mt-24px
      @click="showChartPanel = true"
    >
      <Icon size="25">
        <ChartPie />
      </Icon>
      <div>视图</div>
    </div>

    <ChartPanel v-model:show="showChartPanel" @submit="onSubmitChart" />

    <n-divider />

    <div
      flex="~ col"
      gap-1
      items-center
      hover:text-gray
      cursor-pointer
      @click="showComponentPanel = true"
    >
      <Icon size="25">
        <Components />
      </Icon>
      <div>组件</div>
    </div>

    <ComponentPanel
      v-model:show="showComponentPanel"
      @submit="onSubmitComponent"
    />
    
    <n-divider />

    <div flex="~ col" gap-1 items-center hover:text-gray cursor-pointer>
      <Icon size="25">
        <Map2 />
      </Icon>
      <div>地图</div>
    </div>

    <n-divider />
  </div>
</template>

<style scoped></style>
