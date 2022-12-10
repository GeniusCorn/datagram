<script setup lang="ts">
import { useDataStore } from '@/store/index'

const props = defineProps<{
  index: number
}>()

const store = useDataStore()
</script>

<template>
  <n-form w-full label-placement="left" label-width="auto" size="large">
    <n-form-item label="X 轴">
      <n-input-number
        v-model:value="store.elementsList[props.index].drag.x"
        :validator="(x: number) => x > -1"
      />
    </n-form-item>

    <n-form-item label="Y 轴">
      <n-input-number
        v-model:value="store.elementsList[props.index].drag.y"
        :validator="(x: number) => x > -1"
      />
    </n-form-item>

    <n-form-item label="宽度">
      <n-input-number
        v-model:value="store.elementsList[props.index].drag.width"
        :validator="(x: number) => x > 0"
      />
    </n-form-item>

    <n-form-item label="高度">
      <n-input-number
        v-model:value="store.elementsList[props.index].drag.height"
        :validator="(x: number) => x > 0"
      />
    </n-form-item>
  </n-form>
</template>

<style scoped></style>
