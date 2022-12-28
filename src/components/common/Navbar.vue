<script setup lang="ts">
import router from '@/router/index'
import { Icon } from '@vicons/utils'
import { User, Apple, EditCircle, Logout } from '@vicons/tabler'
import { Component } from 'vue'

const options = $ref([
  {
    label: '个人信息',
    key: 'profile',
    icon: renderIcon(Apple)
  },
  {
    label: '修改密码',
    key: 'changePassword',
    icon: renderIcon(EditCircle)
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(Logout)
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
      localStorage.removeItem('token')
      localStorage.removeItem('account')
      window.$message?.info('退出登录')

      router.push('login')
      break

    default:
      break
  }
}

function renderIcon(icon: Component) {
  return () => {
    return h(Icon, null, {
      default: () => h(icon)
    })
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
            <n-button text @click="router.push('/dataset')">数据集</n-button>
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
