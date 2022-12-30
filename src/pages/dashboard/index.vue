<script setup lang="ts">
import DashboardsService from '@/service/dashboards'

const account = $ref(localStorage.getItem('account') as string)

const res = await DashboardsService.getDashboardByOwner(account)
const dashboards = $ref(res.data.data)
</script>

<template>
  <n-layout>
    <n-layout-header>
      <Navbar />
    </n-layout-header>
    <n-layout-content>
      <div h="[calc(100vh-3rem)]" flex="~ row" overflow-hidden>
        <div w-60 h-full border="r gray" p-4 box-border flex="~ col">
          <div flex="~ row" justify-between items-center>
            <h2>仪表盘</h2>

            <n-button icon-placement="right" type="primary" size="small">
              添加
            </n-button>
          </div>

          <div h-full overflow-y-auto overflow-x-hidden flex="~ col" gap-2>
            <div
              v-for="(dashboard, index) in dashboards"
              :key="index"
              flex="~ row"
              gap-2
              hover="text-[#36ad2a]"
              cursor-pointer
              transition
              duration-200
              ease-in-out
            >
              <div>
                {{ index + 1 }}
              </div>
              <div w-full>
                {{ dashboard.name }}
              </div>
            </div>
          </div>
        </div>

        <div w-full overflow-auto></div>
      </div>
    </n-layout-content>
  </n-layout>
</template>
