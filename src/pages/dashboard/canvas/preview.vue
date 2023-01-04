<script setup lang="ts">
import { useDataStore } from '@/store'
// @ts-ignore
import VueDragResize from 'vue-drag-resize'

const store = useDataStore()

const elementsList = $ref(
  JSON.parse(localStorage.getItem('elementsList') as string)
)

if (elementsList)
  store.$patch({
    elementsList
  })

const canvas: HTMLElement | undefined = $ref()

let clientWidth: number | undefined = $ref()
let clientHeight: number | undefined = $ref()

onMounted(() => {
  clientWidth = canvas?.clientWidth
  clientHeight = canvas?.clientHeight

  window.addEventListener('resize', () => {
    clientWidth = canvas?.clientWidth
    clientHeight = canvas?.clientHeight
  })
})
</script>

<template>
  <PreviewNavBar />

  <div id="canvas" ref="canvas" bg-gray-100 w="[1920px]" h="[1080px]">
    <VueDragResize
      v-for="(element, index) in store.elementsList"
      :key="element.id"
      :x="element.drag.x"
      :y="element.drag.y"
      :w="element.drag.width"
      :h="element.drag.height"
      :parent-w="clientWidth"
      :parent-h="clientHeight"
      :is-draggable="false"
      :is-resizable="false"
      :is-active="element.drag.isActive"
    >
      <component :is="element.cpt.type" :index="index" />
    </VueDragResize>
  </div>
</template>

<style>
html {
  height: 100%;
  overflow: auto;
}
</style>
