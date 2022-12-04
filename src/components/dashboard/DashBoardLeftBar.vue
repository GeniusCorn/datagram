<script setup lang="ts">
import { Icon } from '@vicons/utils'
import { ChartPie, Map2, Components } from '@vicons/tabler'

let showChartPanel: boolean = $ref(false)

let selectedChart: string | undefined = $ref(undefined)

function onSubmitChart(chart: string) {
  showChartPanel = false
  selectedChart = chart
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

    <div flex="~ col" gap-1 items-center hover:text-gray cursor-pointer>
      <Icon size="25">
        <Components />
      </Icon>
      <div>组件</div>
    </div>

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
