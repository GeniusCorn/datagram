<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()

let xAxisEnabled: boolean = $ref(false)
let xAxisLabelEnabled: boolean = $ref(false)

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

  !store.elementsList[props.index].cpt.options.xAxis.label
    ? (xAxisLabelEnabled = false)
    : (xAxisLabelEnabled = true)
}

function handleXAxisChange(value: boolean) {
  if (value === true)
    store.elementsList[props.index].cpt.options.xAxis = {
      position: 'bottom',
      label: false
    }
  else store.elementsList[props.index].cpt.options.xAxis = false
}

function handleXAxisLabelChange(value: boolean) {
  if (value === true)
    store.elementsList[props.index].cpt.options.xAxis.label = {}
  else store.elementsList[props.index].cpt.options.xAxis.label = false
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
</script>

<template>
  <n-collapse-item title="坐标轴" name="axis">
    <n-form w-full label-placement="left" label-width="auto" size="medium">
      <n-form-item label="x 轴开关">
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

        <n-form-item label="x 轴标签">
          <n-switch
            v-model:value="xAxisLabelEnabled"
            @update:value="handleXAxisLabelChange"
          />
        </n-form-item>
      </template>
    </n-form>
  </n-collapse-item>
</template>

<style scoped></style>
