<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()

let data = $ref(store.elementsList[props.index].cpt.options.data)

watch(
  () => props.index,
  () => {
    data = store.elementsList[props.index].cpt.options.data
  }
)

const selectOptions: any[] = $computed(() => {
  const array: any[] = []

  Object.keys(data.at(0)).forEach((i: any) => {
    array.push({
      label: i,
      value: i
    })
  })

  return array
})

function loadData() {
  data = store.elementsList[props.index].cpt.options.data
}

defineExpose({ loadData })
</script>

<template>
  <n-form w-full label-placement="left" label-width="auto" size="medium">
    <n-form-item label="x 方向字段">
      <n-select
        v-model:value="store.elementsList[props.index].cpt.options.xField"
        :options="selectOptions"
      />
    </n-form-item>

    <n-form-item label="y 方向字段">
      <n-select
        v-model:value="store.elementsList[props.index].cpt.options.yField"
        :options="selectOptions"
      />
    </n-form-item>

    <n-form-item
      v-if="store.elementsList[props.index].cpt.type === 'MultipleLineChart'"
      label="分组字段"
    >
      <n-select
        v-model:value="store.elementsList[props.index].cpt.options.seriesField"
        :options="selectOptions"
      />
    </n-form-item>
  </n-form>
</template>

<style scoped></style>
