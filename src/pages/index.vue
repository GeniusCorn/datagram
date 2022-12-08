<script setup lang="ts">
const canvas: any = $ref()
function updateData() {
  canvas.updateData()
}
</script>

<template>
  <div max-h-screen max-w-screen>
    <DashBoardNavBar />

    <div h="[calc(100vh-3rem)]" flex="~" justify-between>
      <DashBoardLeftBar />

      <DashBoardCanvas ref="canvas" />
      <div></div>

      <DashBoardRightBar @update="updateData" />
    </div>
  </div>
</template>

<style scoped></style>

<!-- <route lang="yaml">
meta:
  layout: home
</route> -->
