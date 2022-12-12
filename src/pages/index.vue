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
    <DashBoardNavBar />

    <div h="[calc(100vh-3rem)]" flex="~" justify-between>
      <DashBoardLeftBar />

      <DashBoardCanvas ref="canvas" :scale="scale" />

      <DashBoardSlider
        :scale="scale"
        absolute
        bottom-1
        left-20
        w-30
        @update="updateScale"
      />
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
