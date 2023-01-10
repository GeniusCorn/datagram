<script setup lang="ts">
const emit = defineEmits<{
  (e: 'submit', chart: string): void
}>()

let selectedChart: string | undefined = $ref(undefined)

function selectChart(chart: string) {
  selectedChart = chart
}

function submitSelectedChart(chart: string | undefined) {
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
    <div flex="~" justify-around>
      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'LineChart' }"
        @click="selectChart('LineChart')"
      >
        折线图
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
        柱状图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'BarChart' }"
        @click="selectChart('BarChart')"
      >
        条形图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'PieChart' }"
        @click="selectChart('PieChart')"
      >
        饼图
      </div>
    </div>

    <template #footer>
      <n-button
        float-right
        type="primary"
        @click="submitSelectedChart(selectedChart)"
        >确认</n-button
      >
    </template>
  </n-modal>
</template>

<style scoped>
.selected {
  @apply border-[#18a058] text-[#18a058];
}

.chartBlock {
  @apply h-16 w-16 border rounded cursor-pointer flex flex-col items-center;
}
</style>
