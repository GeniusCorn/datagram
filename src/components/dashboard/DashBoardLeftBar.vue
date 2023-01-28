<script setup lang="ts">
import { Icon } from '@vicons/utils'
import { ChartPie, Map2, CursorText, Photo } from '@vicons/tabler'
import { useDataStore } from '@/store/index'
import type { CptName } from '@/types/Element'

const store = useDataStore()

let showChartPanel: boolean = $ref(false)

// eslint-disable-next-line no-unused-vars
let selected: CptName | undefined = $ref(undefined)

function onSubmitComponent(component: CptName) {
  showChartPanel = false
  selected = component

  store.addElement(component)
  window.$message?.success(`组件添加成功`)

  selected = undefined
}
</script>

<template>
  <div flex="~ col" bg="[#f8f9fa]" w-20 h-full items-center gap-4>
    <div class="button" mt-40px @click="showChartPanel = true">
      <Icon size="25">
        <ChartPie />
      </Icon>
      <div>图表</div>
    </div>

    <ChartPanel v-model:show="showChartPanel" @submit="onSubmitComponent" />

    <n-divider />

    <div class="button" @click="onSubmitComponent('TextCpt')">
      <Icon size="25">
        <CursorText />
      </Icon>
      <div>文本</div>
    </div>

    <n-divider />

    <div class="button" @click="onSubmitComponent('PicCpt')">
      <Icon size="25">
        <Photo />
      </Icon>
      <div>图片</div>
    </div>

    <n-divider />

    <!-- <div class="button">
      <Icon size="25">
        <Map2 />
      </Icon>
      <div>地图</div>
    </div>

    <n-divider /> -->
  </div>
</template>

<style scoped>
.button {
  @apply flex flex-col gap-1 justify-center items-center hover:text-[#36ad2a] cursor-pointer transition duration-200 ease-in-out;
}
</style>
