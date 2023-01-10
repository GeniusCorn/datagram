<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()

let labelEnabled: boolean = $ref(false)

const isPie: boolean = $computed(
  () => store.elementsList[props.index].cpt.type === 'PieChart'
)

function checkStatus() {
  !store.elementsList[props.index].cpt.options.label
    ? (labelEnabled = false)
    : (labelEnabled = true)
}

function handleLabelChange(value: boolean) {
  if (isPie) {
    value
      ? (store.elementsList[props.index].cpt.options.label = {
          type: 'inner',
          style: {
            fontSize: 12
          }
        })
      : (store.elementsList[props.index].cpt.options.label = false)
  } else {
    value
      ? (store.elementsList[props.index].cpt.options.label = {
          position: 'middle',
          style: {
            fontSize: 12
          }
        })
      : (store.elementsList[props.index].cpt.options.label = false)
  }
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

const pieLabelTypeOptions = $ref([
  {
    label: '内',
    value: 'inner'
  },
  {
    label: '外',
    value: 'outer'
  }
])

onMounted(() => {
  checkStatus()
})

onUpdated(() => {
  checkStatus()
})
</script>

<template>
  <n-form-item label="标签显示" label-placement="left">
    <n-switch v-model:value="labelEnabled" @update:value="handleLabelChange" />
  </n-form-item>

  <template v-if="labelEnabled">
    <n-form-item v-if="!isPie" label="标签位置">
      <n-select
        v-model:value="
          store.elementsList[props.index].cpt.options.label.position
        "
        :options="labelPositionOptions"
      />
    </n-form-item>

    <n-form-item v-if="isPie" label="标签位置">
      <n-select
        v-model:value="store.elementsList[props.index].cpt.options.label.type"
        :options="pieLabelTypeOptions"
      />
    </n-form-item>

    <n-form-item label="标签大小">
      <n-input-number
        v-model:value="
          store.elementsList[props.index].cpt.options.label.style.fontSize
        "
        w-full
        :validator="(x: number) => x > 0"
        placeholder="请输入数字"
      />
    </n-form-item>

    <n-form-item label="字体颜色">
      <n-color-picker
        v-model:value="
          store.elementsList[props.index].cpt.options.label.style.fill
        "
      />
    </n-form-item>
  </template>
</template>
