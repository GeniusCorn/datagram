<script setup lang="ts"></script>

<template>
  <Suspense>
    <n-message-provider>
      <WindowMessage />
      <RouterView />
    </n-message-provider>
  </Suspense>
</template>

<style>
html {
  height: 100%;
  overflow: hidden;
}
</style>
