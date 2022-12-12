<script setup lang="ts">
const props = defineProps<{
  index: number
}>()
</script>

<template>
  <n-collapse accordion>
    <AxisConfig :index="props.index" />
  </n-collapse>
</template>

<style scoped></style>
