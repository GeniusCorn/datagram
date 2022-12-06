<script setup lang="ts">
import { useMessage } from 'naive-ui'

const message = useMessage()

const emit = defineEmits<{
  (e: 'submit', component: string): void
}>()

let selectedComponent: string | undefined = $ref()

function selectComponent(component: string) {
  selectedComponent = component
}

function submitSelectedComponent(component: string | undefined) {
  if (component === undefined) {
    message.error('请选择一个组件类型')
    return
  }

  message.info(`选择${component}`)
  selectedComponent = undefined
  emit('submit', component)
}
</script>

<template>
  <n-modal w-600px preset="card" title="添加组件">
    <div flex="~" justify-around>
      <div
        class="chartBlock"
        :class="{ selected: selectedComponent === 'CptText' }"
        @click="selectComponent('CptText')"
      >
        文字
      </div>
      <div
        class="chartBlock"
        :class="{ selected: selectedComponent === 'image' }"
        @click="selectComponent('image')"
      >
        图片
      </div>
    </div>

    <template #footer>
      <n-button
        float-right
        type="primary"
        @click="submitSelectedComponent(selectedComponent)"
        >确认</n-button
      >
    </template>
  </n-modal>
</template>

<style scoped>
.selected {
  @apply border-[#18a058] text-[#18a058];
}

.chartBlock {
  @apply h-16 w-16 border rounded cursor-pointer flex flex-col items-center;
}
</style>
