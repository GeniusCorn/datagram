<script setup lang="ts">
import { Icon } from '@vicons/utils'
import { ChevronLeft } from '@vicons/tabler'
</script>

<template>
  <div flex="~ row" justify-between items-center border="b gray" h-47px px-32px>
    <div>
      <Icon>
        <ChevronLeft />
      </Icon>
    </div>

    <div>
      <n-space>
        <n-button quaternary>预览</n-button>
        <n-button type="info">导出</n-button>
        <n-button type="primary">保存</n-button>
      </n-space>
    </div>
  </div>
</template>

<style scoped></style>
