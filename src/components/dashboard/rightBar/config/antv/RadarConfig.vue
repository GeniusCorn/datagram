<script setup lang="ts">
import { useDataStore } from '@/store'

const store = useDataStore()

const props = defineProps<{
  index: number
}>()
</script>

<template>
  <n-collapse accordion>
    <n-collapse-item title="图表" name="chart">
      <n-form label-width="auto">
        <n-form-item label="曲线平滑" label-placement="left">
          <n-switch
            v-model:value="store.elementsList[props.index].cpt.options.smooth"
          />
        </n-form-item>
      </n-form>
    </n-collapse-item>

    <PointConfig :index="props.index" />

    <LabelConfig :index="props.index" />

    <AxisConfig :index="props.index" />
  </n-collapse>
</template>

<style scoped></style>
