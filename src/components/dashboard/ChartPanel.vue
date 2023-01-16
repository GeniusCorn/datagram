<script setup lang="ts">
import type { ChartName } from '@/types/Element'

const emit = defineEmits<{
  (e: 'submit', chart: string): void
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
        基础折线图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'MultipleLineChart' }"
        @click="selectChart('MultipleLineChart')"
      >
        堆叠折线图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'AreaChart' }"
        @click="selectChart('AreaChart')"
      >
        面积图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'ColumnChart' }"
        @click="selectChart('ColumnChart')"
      >
        基础柱状图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'GroupedColumnChart' }"
        @click="selectChart('GroupedColumnChart')"
      >
        分组柱状图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'StackedColumnChart' }"
        @click="selectChart('StackedColumnChart')"
      >
        堆叠柱状图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'WaterFallChart' }"
        @click="selectChart('WaterFallChart')"
      >
        瀑布图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'BarChart' }"
        @click="selectChart('BarChart')"
      >
        横向柱状图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'PieChart' }"
        @click="selectChart('PieChart')"
      >
        饼图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'RoseChart' }"
        @click="selectChart('RoseChart')"
      >
        多色玫瑰图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'RadarChart' }"
        @click="selectChart('RadarChart')"
      >
        雷达图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'ScatterChart' }"
        @click="selectChart('ScatterChart')"
      >
        散点图
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
  @apply h-16 w-16 border rounded cursor-pointer flex flex-col items-center hover:text-[#36ad2a] cursor-pointer transition duration-200 ease-in-out;
}
</style>
