<script setup lang="ts">
import { useDataStore } from '@/store/index'
// @ts-ignore
import VueDragResize from 'vue-drag-resize'
import { Rect } from '@/types/Rect'

const store = useDataStore()

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

function changePosition(newRect: Rect, index: number): void {
  store.changeElementPosition(newRect, index)
}

function changeSize(newRect: Rect, index: number): void {
  store.changeElementSize(newRect, index)
}

const itemRefs: any[] = $ref([])

function updateData() {
  itemRefs.at(store.currentElement).updateData()
}

defineExpose({ updateData })
</script>

<template>
  <div
    ref="canvas"
    absolute
    top-12
    left-20
    right-68
    h="[calc(100vh-3rem-1rem)]"
  >
    <VueDragResize
      v-for="(element, index) in store.elementsList"
      :key="element.id"
      :x="element.drag.x"
      :y="element.drag.y"
      :w="element.drag.width"
      :h="element.drag.height"
      :is-active="element.drag.isActive"
      :parent-w="clientWidth"
      :parent-h="clientHeight"
      :parent-limitation="true"
      @activated="store.setElementActive(index)"
      @deactivated="store.unsetElementActive"
      @resizing="changeSize($event, index)"
      @dragging="changePosition($event, index)"
    >
      <component :is="element.cpt.type" ref="itemRefs" :index="index" />
    </VueDragResize>
  </div>
</template>

<style scoped></style>
