<script setup lang="ts">
import router from '@/router/index'
import { Icon } from '@vicons/utils'
import { User } from '@vicons/tabler'

const options = $ref([
  {
    label: '个人信息',
    key: 'profile'
  },
  {
    label: '修改密码',
    key: 'changePassword'
  },
  {
    label: '退出登录',
    key: 'logout'
  }
])

function handleSelect(key: string): void {
  switch (key) {
    case 'profile':
      router.push('profile')
      break

    case 'changePassword':
      router.push('password_reset')
      break

    case 'logout':
      router.push('login')
      break

    default:
      break
  }
}
</script>

<template>
  <div flex="~ row" items-center border="b gray" box-border h-12 px-10>
    <div flex="~ row" items-center justify-between w-full>
      <n-space>
        <div>DataGram</div>

        <div flex="~ row">
          <n-space>
            <n-button text @click="router.push('/')">首页</n-button>
            <n-button text @click="router.push('/dashboard')">仪表盘</n-button>
            <n-button text>数据源</n-button>
          </n-space>
        </div>
      </n-space>

      <n-space>
        <n-dropdown :options="options" @select="handleSelect">
          <n-button text>
            <template #icon>
              <Icon>
                <User />
              </Icon>
            </template>
            示例用户
          </n-button>
        </n-dropdown>
      </n-space>
    </div>
  </div>
</template>

<style scoped></style>
