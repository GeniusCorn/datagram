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
        <n-form-item label="是否转置" label-placement="left">
          <n-switch
            v-model:value="
              store.elementsList[props.index].cpt.options.isTransposed
            "
          />
        </n-form-item>

        <n-form-item label="动态高度" label-placement="left">
          <n-switch
            v-model:value="
              store.elementsList[props.index].cpt.options.dynamicHeight
            "
          />
        </n-form-item>
      </n-form>
    </n-collapse-item>

    <LabelConfig :index="props.index" />
  </n-collapse>
</template>

<style scoped></style>
