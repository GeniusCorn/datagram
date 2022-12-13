<script setup lang="ts">
import { Icon } from '@vicons/utils'
import { ChartPie, Map2, CursorText, Photo } from '@vicons/tabler'
import { useDataStore } from '@/store/index'
import { useMessage } from 'naive-ui'

const message = useMessage()

const store = useDataStore()

let showChartPanel: boolean = $ref(false)

// eslint-disable-next-line no-unused-vars
let selected: string | undefined = $ref(undefined)

function onSubmitComponent(component: string) {
  showChartPanel = false
  selected = component

  store.addElement(component)
  message.success(`组件添加成功`)

  selected = undefined
}
</script>

<template>
  <div flex="~ col" bg="[#f8f9fa]" w-20 h-full items-center gap-4>
    <div
      flex="~ col"
      gap-1
      items-center
      hover:text-gray
      cursor-pointer
      mt-24px
      @click="showChartPanel = true"
    >
      <Icon size="25">
        <ChartPie />
      </Icon>
      <div>视图</div>
    </div>

    <ChartPanel v-model:show="showChartPanel" @submit="onSubmitComponent" />

    <n-divider />

    <div
      flex="~ col"
      gap-1
      items-center
      hover:text-gray
      cursor-pointer
      @click="onSubmitComponent('cptText')"
    >
      <Icon size="25">
        <CursorText />
      </Icon>
      <div>文本</div>
    </div>

    <n-divider />

    <div flex="~ col" gap-1 items-center hover:text-gray cursor-pointer>
      <Icon size="25">
        <Photo />
      </Icon>
      <div>图片</div>
    </div>

    <n-divider />

    <div flex="~ col" gap-1 items-center hover:text-gray cursor-pointer>
      <Icon size="25">
        <Map2 />
      </Icon>
      <div>地图</div>
    </div>

    <n-divider />
  </div>
</template>

<style scoped></style>
