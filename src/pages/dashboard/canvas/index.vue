<script setup lang="ts">
let scale: number = $ref(1)

const canvas: any = $ref()
function updateData() {
  canvas.updateData()
}

function updateScale(newScale: number) {
  scale = newScale
}
</script>

<template>
  <div max-h-screen max-w-screen>
    <DashBoardNavBar @export="updateScale(1)" />

    <div h="[calc(100vh-3rem)]" flex="~" justify-between>
      <DashBoardLeftBar />

      <DashBoardCanvas ref="canvas" :scale="scale" />

      <div absolute bottom-1 left-20 w-30>
        <n-slider v-model:value="scale" :max="1" :min="0.1" :step="0.01" />
      </div>
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
