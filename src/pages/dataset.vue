<script setup lang="ts">
import { Table, Database } from '@vicons/tabler'
import { Icon } from '@vicons/utils'
import { Component } from 'vue'

const options = $ref([
  {
    label: 'Excel 数据集',
    key: 'excel',
    icon: renderIcon(Table)
  },
  {
    label: 'API 数据集',
    key: 'api',
    icon: renderIcon(Database)
  }
])

function renderIcon(icon: Component) {
  return () => {
    return h(Icon, null, {
      default: () => h(icon)
    })
  }
}
</script>

<template>
  <n-layout>
    <n-layout-header>
      <Navbar />
    </n-layout-header>
    <n-layout-content>
      <div h="[calc(100vh-3rem)]">
        <div w-60 h-full border="r gray" overflow-auto p-4 box-border>
          <div flex="~ row" justify-between items-center>
            <h2>数据集</h2>

            <n-dropdown :options="options">
              <n-button icon-placement="right" type="primary" size="small">
                添加
              </n-button>
            </n-dropdown>
          </div>
        </div>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style scoped></style>
