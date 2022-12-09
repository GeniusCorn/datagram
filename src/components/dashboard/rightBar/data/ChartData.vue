<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()

let data = $ref(JSON.stringify(store.elementsList[props.index].cpt.data))

watch(
  () => props.index,
  () => {
    data = JSON.stringify(store.elementsList[props.index].cpt.data)
  }
)

const emit = defineEmits(['update'])

function updateData() {
  store.elementsList[props.index].cpt.data = JSON.parse(data)
  store.elementsList[props.index].cpt.options.data = JSON.parse(data)
  emit('update')
}

const cptTypeToData = new Map().set('BasicLine', 'BasicLineData')
</script>

<template>
  <n-space vertical>
    <component
      :is="cptTypeToData.get(store.elementsList[index].cpt.type)"
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

    <n-button ghost type="primary" float-right @click="updateData"
      >更新数据</n-button
    >
  </n-space>
</template>

<style scoped></style>
