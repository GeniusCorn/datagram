<script setup lang="ts">
import { useDataStore } from '@/store/index'

const store = useDataStore()

let index: number = $ref(0)

const cptTypeToConfig = new Map().set('CptText', 'TextConfig')
const cptTypeToData = new Map().set('CptText', 'TextData')

watch(store.elementsList, () => {
  for (let i = 0; i < store.elementsList.length; i += 1) {
    if (store.elementsList[i].drag.isActive === true) index = i
  }
})
</script>

<template>
  <div w-60 h-full bg="[#f8f9fa]" px-4>
    <template v-if="store.currentElement !== -1">
      <n-tabs
        default-value="coordinate"
        justify-content="space-evenly"
        type="line"
      >
        <n-tab-pane name="coordinate" tab="坐标"> 坐标 </n-tab-pane>

        <n-tab-pane name="config" tab="属性">
          <component
            :is="cptTypeToConfig.get(store.elementsList[index].cpt.type)"
            :index="index"
          />

          <RemoveElement :index="index" />
        </n-tab-pane>

        <n-tab-pane name="data" tab="数据">
          <component
            :is="cptTypeToData.get(store.elementsList[index].cpt.type)"
            :index="index"
          />
        </n-tab-pane>
      </n-tabs>
    </template>
  </div>
</template>

<style scoped></style>
