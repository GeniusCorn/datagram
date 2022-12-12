<script setup lang="ts">
import { useDataStore } from '@/store'

const store = useDataStore()
const props = defineProps<{
  index: number
}>()

let labelEnabled: boolean = $ref(false)

onMounted(() => {
  checkStatus()
})

onUpdated(() => {
  checkStatus()
})

function checkStatus() {
  !store.elementsList[props.index].cpt.options.label
    ? (labelEnabled = false)
    : (labelEnabled = true)
}

function handleLabelChange(value: boolean) {
  value
    ? (store.elementsList[props.index].cpt.options.label = {
        position: 'middle',
        style: {
          fontSize: 12
        }
      })
    : (store.elementsList[props.index].cpt.options.label = false)
}

const labelPositionOptions = $ref([
  {
    label: '置顶',
    value: 'top'
  },
  {
    label: '居中',
    value: 'middle'
  },
  {
    label: '置底',
    value: 'bottom'
  }
])
</script>

<template>
  <n-form w-full label-width="auto" size="medium">
    <n-form-item label="标签显示" label-placement="left">
      <n-switch
        v-model:value="labelEnabled"
        @update:value="handleLabelChange"
      />
    </n-form-item>

    <template v-if="labelEnabled">
      <n-form-item label="标签位置">
        <n-select
          v-model:value="
            store.elementsList[props.index].cpt.options.label.position
          "
          :options="labelPositionOptions"
        />
      </n-form-item>

      <n-form-item label="标签大小">
        <n-input-number
          v-model:value="
            store.elementsList[props.index].cpt.options.label.style.fontSize
          "
          w-full
        />
      </n-form-item>
    </template>
  </n-form>

  <n-collapse accordion>
    <AxisConfig :index="props.index" />
  </n-collapse>
</template>

<style scoped></style>
