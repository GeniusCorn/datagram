<script setup lang="ts">
import { useDataStore } from '@/store'

const store = useDataStore()

const props = defineProps<{
  index: number
}>()
</script>

<template>
  <n-form w-full label-width="auto" size="medium">
    <n-form-item label="曲线平滑" label-placement="left">
      <n-switch
        v-model:value="store.elementsList[props.index].cpt.options.smooth"
      />
    </n-form-item>

    <LabelConfig :index="props.index" />
  </n-form>

  <n-collapse accordion>
    <AxisConfig :index="props.index" />
  </n-collapse>
</template>

<style scoped></style>
