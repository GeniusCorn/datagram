<script setup lang="ts">
const options = $ref({
  text: '新建普通文本',
  bold: false
})
</script>

<template>
  <div>{{ options.text }}</div>
</template>

<style scoped></style>
