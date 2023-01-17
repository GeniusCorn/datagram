<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()

const objectFitOptions = $ref([
  {
    label: 'fill',
    value: 'fill'
  },
  {
    label: 'contain',
    value: 'contain'
  },
  {
    label: 'cover',
    value: 'cover'
  },
  {
    label: 'scale-down',
    value: 'scale-down'
  }
])
</script>

<template>
  <n-form w-full label-width="auto" size="medium">
    <n-form-item label="填充方式">
      <n-select
        v-model:value="store.elementsList[props.index].cpt.options.objectFit"
        :options="objectFitOptions"
      />
    </n-form-item>
  </n-form>
</template>

<style scoped></style>
