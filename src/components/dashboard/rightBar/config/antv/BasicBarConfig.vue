<script setup lang="ts">
const props = defineProps<{
  index: number
}>()
</script>

<template>
  <n-form w-full label-width="auto" size="medium">
    <LabelConfig :index="props.index" />
  </n-form>

  <n-collapse accordion>
    <AxisConfig :index="props.index" />
  </n-collapse>
</template>

<style scoped></style>
