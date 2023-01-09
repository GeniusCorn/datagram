<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()

let data = $ref(
  JSON.stringify(store.elementsList[props.index].cpt.options.data)
)

watch(
  () => props.index,
  () => {
    data = JSON.stringify(store.elementsList[props.index].cpt.options.data)
  }
)

const emit = defineEmits(['update'])

function updateData() {
  store.elementsList[props.index].cpt.data = JSON.parse(data)
  store.elementsList[props.index].cpt.options.data = JSON.parse(data)
  emit('update')
}

const cptTypeToData = new Map<string, string>()
  .set('BasicLine', 'CoordinateData')
  .set('BasicArea', 'CoordinateData')
  .set('BasicPie', 'MappingData')
  .set('BasicColumn', 'CoordinateData')
  .set('BasicBar', 'CoordinateData')

const dataRef: any = $ref()

function loadData() {
  // plot.changeData(store.elementsList[props.index]?.cpt.data)
  data = JSON.stringify(store.elementsList[props.index].cpt.options.data)
  dataRef.loadData()
}

defineExpose({ loadData })
</script>

<template>
  <n-form size="medium" label-width="auto">
    <component
      :is="cptTypeToData.get(store.elementsList[index].cpt.type)"
      ref="dataRef"
      :index="props.index"
    />

    <n-form-item label="数据内容">
      <n-input
        v-model:value="data"
        :autosize="{
          minRows: 3
        }"
        type="textarea"
        placeholder="文本内容"
      />
    </n-form-item>

    <n-button type="primary" w-full @click="updateData"> 更新数据 </n-button>
  </n-form>
</template>

<style scoped></style>
