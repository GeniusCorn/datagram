<script setup lang="ts">
import { useDataStore } from '@/store'

const store = useDataStore()

const props = defineProps<{
  index: number
}>()

const labelModeOptions = $ref([
  {
    label: 'absolute',
    value: 'absolute'
  },
  {
    label: 'difference',
    value: 'difference'
  }
])
</script>

<template>
  <n-collapse accordion>
    <n-collapse-item title="图表" name="chart">
      <n-form label-width="auto">
        <n-form-item
          v-if="store.elementsList[props.index].cpt.options.label !== false"
          label="标签数据模式"
        >
          <n-select
            v-model:value="
              store.elementsList[props.index].cpt.options.labelMode
            "
            :options="labelModeOptions"
          />
        </n-form-item>
      </n-form>
    </n-collapse-item>

    <LabelConfig :index="props.index" />

    <LegendConfig :index="props.index" />
  </n-collapse>
</template>

<style scoped></style>
