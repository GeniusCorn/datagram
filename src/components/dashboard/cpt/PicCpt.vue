<script setup lang="ts">
import { useDataStore } from '@/store'

const props = defineProps<{
  index: number
}>()

const store = useDataStore()

if (Object.keys(store.elementsList[props.index].cpt.data).length === 0) {
  store.elementsList[props.index].cpt.data =
    'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  store.elementsList[props.index].cpt.options.objectFit = 'fill'
}
</script>

<template>
  <img
    w-full
    h-full
    :src="store.elementsList[props.index].cpt.data"
    :style="{
      objectFit: store.elementsList[index].cpt.options.objectFit
    }"
  />
</template>

<style scoped></style>
