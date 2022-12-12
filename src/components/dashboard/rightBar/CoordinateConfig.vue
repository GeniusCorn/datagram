<script setup lang="ts">
import { useDataStore } from '@/store/index'

const props = defineProps<{
  index: number
}>()

const store = useDataStore()
</script>

<template>
  <n-form w-full label-width="auto" size="medium">
    <n-form-item label="X 轴">
      <n-input-number
        v-model:value="store.elementsList[props.index].drag.x"
        w-full
        :validator="(x: number) => x > -1"
        placeholder="请输入数字"
      />
    </n-form-item>

    <n-form-item label="Y 轴">
      <n-input-number
        v-model:value="store.elementsList[props.index].drag.y"
        w-full
        :validator="(x: number) => x > -1"
        placeholder="请输入数字"
      />
    </n-form-item>

    <n-form-item label="宽度">
      <n-input-number
        v-model:value="store.elementsList[props.index].drag.width"
        w-full
        :validator="(x: number) => x > 0"
        placeholder="请输入数字"
      />
    </n-form-item>

    <n-form-item label="高度">
      <n-input-number
        v-model:value="store.elementsList[props.index].drag.height"
        w-full
        :validator="(x: number) => x > 0"
        placeholder="请输入数字"
      />
    </n-form-item>
  </n-form>
</template>

<style scoped></style>
