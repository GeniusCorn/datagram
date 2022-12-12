<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()

let xAxisEnabled: boolean = $ref(false)
let xAxisLabelEnabled: boolean = $ref(false)

let yAxisEnabled: boolean = $ref(false)
let yAxisLabelEnabled: boolean = $ref(false)

onMounted(() => {
  checkStatus()
})

onUpdated(() => {
  checkStatus()
})

function checkStatus() {
  !store.elementsList[props.index].cpt.options.xAxis
    ? (xAxisEnabled = false)
    : (xAxisEnabled = true)

  !store.elementsList[props.index].cpt.options.yAxis
    ? (yAxisEnabled = false)
    : (yAxisEnabled = true)

  !store.elementsList[props.index].cpt.options.xAxis.label
    ? (xAxisLabelEnabled = false)
    : (xAxisLabelEnabled = true)

  !store.elementsList[props.index].cpt.options.yAxis.label
    ? (yAxisLabelEnabled = false)
    : (yAxisLabelEnabled = true)
}

function handleXAxisChange(value: boolean) {
  if (value === true)
    store.elementsList[props.index].cpt.options.xAxis = {
      position: 'bottom',
      label: false,
      tickCount: 5,
      tickMethod: 'cat'
    }
  else store.elementsList[props.index].cpt.options.xAxis = false
}

function handleXAxisLabelChange(value: boolean) {
  if (value === true)
    store.elementsList[props.index].cpt.options.xAxis.label = {}
  else store.elementsList[props.index].cpt.options.xAxis.label = false
}

function handleYAxisChange(value: boolean) {
  if (value === true)
    store.elementsList[props.index].cpt.options.yAxis = {
      position: 'left',
      label: false,
      tickCount: 5,
      tickMethod: 'r-pretty'
    }
  else store.elementsList[props.index].cpt.options.yAxis = false
}

function handleYAxisLabelChange(value: boolean) {
  if (value === true)
    store.elementsList[props.index].cpt.options.yAxis.label = {}
  else store.elementsList[props.index].cpt.options.yAxis.label = false
}

const positionOptions = $ref([
  {
    label: '置顶',
    value: 'top'
  },
  {
    label: '置底',
    value: 'bottom'
  },
  {
    label: '居左',
    value: 'left'
  },
  {
    label: '居右',
    value: 'right'
  }
])

const tickMethodOptions = $ref([
  {
    label: 'cat',
    value: 'cat'
  },
  {
    label: 'time-cat',
    value: 'time-cat'
  },
  {
    label: 'wilkinson-extended',
    value: 'wilkinson-extended'
  },
  {
    label: 'r-pretty',
    value: 'r-pretty'
  },
  {
    label: 'time',
    value: 'time'
  },
  {
    label: 'time-pretty',
    value: 'time-pretty'
  },
  {
    label: 'log',
    value: 'log'
  },
  {
    label: 'pow',
    value: 'pow'
  },
  {
    label: 'quantile',
    value: 'quantile'
  },
  {
    label: 'd3-linear',
    value: 'd3-linear'
  }
])
</script>

<template>
  <n-collapse-item title="坐标轴" name="axis">
    <n-form w-full label-width="auto" size="medium">
      <n-form-item label="x 轴显示" label-placement="left">
        <n-switch
          v-model:value="xAxisEnabled"
          @update:value="handleXAxisChange"
        />
      </n-form-item>

      <template v-if="xAxisEnabled">
        <n-form-item label="x 轴位置">
          <n-select
            v-model:value="
              store.elementsList[props.index].cpt.options.xAxis.position
            "
            :options="positionOptions"
            placeholder="请选择"
          />
        </n-form-item>

        <n-form-item label="x 轴标签" label-placement="left">
          <n-switch
            v-model:value="xAxisLabelEnabled"
            @update:value="handleXAxisLabelChange"
          />
        </n-form-item>

        <n-form-item label="x 轴刻度数量">
          <n-input-number
            v-model:value="
              store.elementsList[props.index].cpt.options.xAxis.tickCount
            "
            w-full
            :validator="(x: number) => x > 0"
            placeholder="请输入数字"
          />
        </n-form-item>

        <n-form-item label="x 轴刻度计算方法">
          <n-select
            v-model:value="
              store.elementsList[props.index].cpt.options.xAxis.tickMethod
            "
            :options="tickMethodOptions"
          />
        </n-form-item>
      </template>

      <n-form-item label="y 轴开关" label-placement="left">
        <n-switch
          v-model:value="yAxisEnabled"
          @update:value="handleYAxisChange"
        />
      </n-form-item>

      <template v-if="yAxisEnabled">
        <n-form-item label="y 轴位置">
          <n-select
            v-model:value="
              store.elementsList[props.index].cpt.options.yAxis.position
            "
            :options="positionOptions"
            placeholder="请选择"
          />
        </n-form-item>

        <n-form-item label="y 轴标签" label-placement="left">
          <n-switch
            v-model:value="yAxisLabelEnabled"
            @update:value="handleYAxisLabelChange"
          />
        </n-form-item>

        <n-form-item label="y 轴刻度数量">
          <n-input-number
            v-model:value="
              store.elementsList[props.index].cpt.options.yAxis.tickCount
            "
            w-full
            :validator="(x: number) => x > 0"
            placeholder="请输入数字"
          />
        </n-form-item>

        <n-form-item label="y 轴刻度计算方法">
          <n-select
            v-model:value="
              store.elementsList[props.index].cpt.options.yAxis.tickMethod
            "
            :options="tickMethodOptions"
          />
        </n-form-item>
      </template>
    </n-form>
  </n-collapse-item>
</template>

<style scoped></style>
