<script setup lang="ts"></script>

<template>
  <div>
    <n-layout>
      <n-layout-header>
        <Navbar />
      </n-layout-header>
      <n-layout-content content-style="padding: 24px">
        <RouterView />
      </n-layout-content>
    </n-layout>
    <n-layout-footer embedded>
      <Footer />
    </n-layout-footer>
  </div>
</template>

<style scoped></style>
