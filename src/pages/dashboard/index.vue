<script setup lang="ts">
import DashboardsService from '@/service/dashboards'

const account = $ref(localStorage.getItem('account') as string)

const res = await DashboardsService.getDashboardByOwner(account)
let dashboards = $ref(res.data.data)

let showModal = $ref(false)
function toggleModal() {
  showModal = !showModal
}

let newDashboardName = $ref('')

async function submitDashboard() {
  if (validateDashboardName(newDashboardName)) {
    const res1 = await DashboardsService.createDashboard(
      account,
      newDashboardName
    )

    if (res1.data.code === 1) {
      window.$message?.error(res1.data.message)
      return false
    } else {
      window.$message?.success(res1.data.message)
      newDashboardName = ''

      updateData()
      return true
    }
  } else {
    return false
  }
}

function validateDashboardName(name: string): boolean {
  if (name.length === 0) {
    window.$message?.error('请输入仪表盘名称')
    return false
  }

  if (name.length > 10) {
    window.$message?.error('仪表盘名称不能大于十个字符')
    return false
  }

  return true
}

async function updateData() {
  const res = await DashboardsService.getDashboardByOwner(account)
  dashboards = res.data.data
}
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

            <n-button
              icon-placement="right"
              type="primary"
              size="small"
              @click="toggleModal"
            >
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

  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    :show-icon="false"
    title="新建仪表盘"
    positive-text="确认"
    negative-text="取消"
    @positive-click="submitDashboard"
  >
    <n-text>仪表盘名称</n-text>
    <n-input v-model:value="newDashboardName" placeholder="请输入仪表盘名称" />
  </n-modal>
</template>
