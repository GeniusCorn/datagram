<script setup lang="ts">
import router from '@/router/index'
import { Icon } from '@vicons/utils'
import { User, Apple, EditCircle, Logout, Settings } from '@vicons/tabler'
import { Component } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const path = $computed(() => route.path)

const account = $ref(localStorage.getItem('account'))

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

const reg = /admin/d
const verify = $computed(() => reg.test(account as string))
</script>

<template>
  <div flex="~ row" items-center border="b gray" box-border h-12 px-10>
    <div flex="~ row" items-center justify-between w-full>
      <div flex gap-4>
        <div @click="router.push('/')">DataGram</div>

        <div flex="~ row">
          <n-space>
            <n-button
              text
              :class="{ 'text-[#36ad2a]': path === '/' }"
              @click="router.push('/')"
              >首页</n-button
            >
            <n-button
              text
              :class="{ 'text-[#36ad2a]': path === '/dashboard' }"
              @click="router.push('/dashboard')"
              >仪表盘</n-button
            >
            <n-button
              text
              :class="{ 'text-[#36ad2a]': path === '/dataset' }"
              @click="router.push('/dataset')"
              >数据集</n-button
            >
          </n-space>
        </div>
      </div>

      <div flex items-center gap-4>
        <n-button v-if="verify" text @click="router.push('/admin')">
          <template #icon>
            <Icon>
              <Settings />
            </Icon>
          </template>
          后台管理
        </n-button>

        <n-dropdown :options="options" @select="handleSelect">
          <n-button text>
            <template #icon>
              <Icon>
                <User />
              </Icon>
            </template>
            {{ account }}
          </n-button>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
