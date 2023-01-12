<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()
</script>

<template>
  <n-collapse accordion>
    <LabelConfig :index="props.index" />

    <AxisConfig :index="props.index" />

    <template
      v-if="
        store.elementsList[props.index].cpt.options.hasOwnProperty('legend')
      "
    >
      <LegendConfig :index="props.index" />
    </template>
  </n-collapse>
</template>

<style scoped></style>
