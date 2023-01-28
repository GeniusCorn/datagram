<script setup lang="ts">
// @ts-ignore
import VueDragResize from 'vue-drag-resize'
import DashboardService from '@/service/dashboards'
import { useRoute } from 'vue-router'
import { decode } from 'base-64'
import { useDataStore } from '@/store'

const store = useDataStore()

const route = useRoute()

const token: string = decode(route.path.split('/').at(-1) as string)
const owner = JSON.parse(token).id
const dashboardName = JSON.parse(token).dashboardName

const res = await DashboardService.getSharedDashboard(owner, dashboardName)

if (res.data.code === 1) {
  window.$message?.error(res.data.message)
}

const elementsList = $ref(JSON.parse(res.data.data.at(0).data))

if (elementsList) {
  store.$patch({
    elementsList
  })
}

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

<route>
  {
    meta: {
      requireAuth: false
    }
  }
</route>
