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
        <n-form-item label="饼图半径">
          <n-input-number
            v-model:value="store.elementsList[props.index].cpt.options.radius"
            w-full
            :max="1"
            :min="0.1"
            :step="0.1"
          />
        </n-form-item>
        <n-form-item label="饼图内半径">
          <n-input-number
            v-model:value="
              store.elementsList[props.index].cpt.options.innerRadius
            "
            w-full
            :max="1"
            :min="0"
            :step="0.1"
          />
        </n-form-item>
      </n-form>
    </n-collapse-item>

    <LabelConfig :index="props.index" />

    <LegendConfig :index="props.index" />
  </n-collapse>
</template>

<style scoped></style>
