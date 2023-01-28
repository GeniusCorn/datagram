<script setup lang="ts">
import lineChartImg from '@/assets/chart/line-chart.png'
import multipleLineChartImg from '@/assets/chart/multiple-line-chart.png'
import areaChartImg from '@/assets/chart/area-chart.png'
import columnChartImg from '@/assets/chart/column-chart.png'
import groupedColumnChartImg from '@/assets/chart/grouped-column-chart.png'
import stackedColumnChartImg from '@/assets/chart/stacked-column-chart.png'
import waterFallChartImg from '@/assets/chart/waterfall-chart.jpg'
import barChartImg from '@/assets/chart/bar-chart.png'
import pieChartImg from '@/assets/chart/pie-chart.png'
import roseChartImg from '@/assets/chart/rose-chart.png'
import radarChartImg from '@/assets/chart/radar-chart.jpg'
import scatterChartImg from '@/assets/chart/scatter-chart.png'
import funnelChartImg from '@/assets/chart/funnel-chart.png'

import type { ChartName } from '@/types/Element'

const emit = defineEmits<{
  (e: 'submit', chart: ChartName): void
}>()

let selectedChart: ChartName | undefined = $ref(undefined)

function selectChart(chart: ChartName) {
  selectedChart = chart
}

function submitSelectedChart(chart: ChartName | undefined) {
  if (chart === undefined) {
    window.$message?.error('请选择一个图表类型')
    return
  }

  selectedChart = undefined
  emit('submit', chart)
}
</script>

<template>
  <n-modal w-600px preset="card" title="添加图表组件">
    <div grid="~ cols-5 gap-4">
      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'LineChart' }"
        @click="selectChart('LineChart')"
      >
        <n-image :src="lineChartImg" width="60" preview-disabled />
        基础折线图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'MultipleLineChart' }"
        @click="selectChart('MultipleLineChart')"
      >
        <n-image :src="multipleLineChartImg" width="60" preview-disabled />
        堆叠折线图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'AreaChart' }"
        @click="selectChart('AreaChart')"
      >
        <n-image :src="areaChartImg" width="60" preview-disabled />
        面积图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'ColumnChart' }"
        @click="selectChart('ColumnChart')"
      >
        <n-image :src="columnChartImg" width="60" preview-disabled />
        基础柱状图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'GroupedColumnChart' }"
        @click="selectChart('GroupedColumnChart')"
      >
        <n-image :src="groupedColumnChartImg" width="60" preview-disabled />
        分组柱状图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'StackedColumnChart' }"
        @click="selectChart('StackedColumnChart')"
      >
        <n-image :src="stackedColumnChartImg" width="60" preview-disabled />
        堆叠柱状图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'WaterFallChart' }"
        @click="selectChart('WaterFallChart')"
      >
        <n-image :src="waterFallChartImg" width="60" preview-disabled />
        瀑布图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'BarChart' }"
        @click="selectChart('BarChart')"
      >
        <n-image :src="barChartImg" width="60" preview-disabled />
        横向柱状图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'PieChart' }"
        @click="selectChart('PieChart')"
      >
        <n-image :src="pieChartImg" width="60" preview-disabled />
        饼图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'RoseChart' }"
        @click="selectChart('RoseChart')"
      >
        <n-image :src="roseChartImg" width="60" preview-disabled />
        多色玫瑰图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'RadarChart' }"
        @click="selectChart('RadarChart')"
      >
        <n-image :src="radarChartImg" width="60" preview-disabled />
        雷达图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'ScatterChart' }"
        @click="selectChart('ScatterChart')"
      >
        <n-image :src="scatterChartImg" width="60" preview-disabled />
        散点图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'FunnelChart' }"
        @click="selectChart('FunnelChart')"
      >
        <n-image :src="funnelChartImg" width="60" preview-disabled />
        漏斗图
      </div>
    </div>

    <template #footer>
      <n-button
        float-right
        type="primary"
        @click="submitSelectedChart(selectedChart)"
      >
        确认
      </n-button>
    </template>
  </n-modal>
</template>

<style scoped>
.selected {
  @apply border-[#36ad2a] text-[#36ad2a];
}

.chartBlock {
  @apply h-16 w-20 border rounded cursor-pointer flex flex-col text-center items-center hover:text-[#36ad2a] cursor-pointer transition duration-200 ease-in-out;
}
</style>
