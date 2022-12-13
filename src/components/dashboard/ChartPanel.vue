<script setup lang="ts">
import { useMessage } from 'naive-ui'

const message = useMessage()

const emit = defineEmits<{
  (e: 'submit', chart: string): void
}>()

let selectedChart: string | undefined = $ref(undefined)

function selectChart(chart: string) {
  selectedChart = chart
}

function submitSelectedChart(chart: string | undefined) {
  if (chart === undefined) {
    message.error('请选择一个图表类型')
    return
  }

  selectedChart = undefined
  emit('submit', chart)
}
</script>

<template>
  <n-modal w-600px preset="card" title="添加视图组件">
    <div flex="~" justify-around>
      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'BasicLine' }"
        @click="selectChart('BasicLine')"
      >
        折线图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'BasicColumn' }"
        @click="selectChart('BasicColumn')"
      >
        柱状图
      </div>

      <div
        class="chartBlock"
        :class="{ selected: selectedChart === 'BasicPie' }"
        @click="selectChart('BasicPie')"
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
