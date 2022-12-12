<script setup lang="ts">
const props = defineProps<{
  scale: number
}>()

const scale: number = $ref(props.scale)

const emit = defineEmits(['update'])

watch(
  () => scale,
  () => {
    emit('update', scale)
  }
)
</script>

<template>
  <n-slider v-model:value="scale" :max="1" :min="0.1" :step="0.01" />
</template>

<style scoped></style>
