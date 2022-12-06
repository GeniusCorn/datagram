<script setup lang="ts"></script>

<template>
  <div max-h-screen max-w-screen>
    <DashBoardNavBar />

    <div h="[calc(100vh-3rem)]" flex="~" justify-between>
      <DashBoardLeftBar />

      <DashBoardCanvas />
      <div></div>

      <DashBoardRightBar />
    </div>
  </div>
</template>

<style scoped></style>

<!-- <route lang="yaml">
meta:
  layout: home
</route> -->
