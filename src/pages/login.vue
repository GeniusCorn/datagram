<script setup lang="ts">
import logo from '@/assets/logo.png'
import router from '@/router'
import { User, Lock } from '@vicons/tabler'
import { useMessage } from 'naive-ui'

const message = useMessage()

interface Form {
  user: string
  password: string
}

const formValue: Form = $ref({
  user: '',
  password: ''
})

function validateForm(formValue: Form): boolean {
  if (formValue.user.length === 0) {
    message.error('请输入用户名')
    return false
  }

  if (formValue.password.length === 0) {
    message.error('请输入密码')
    return false
  }

  if (formValue.password.length < 6) {
<<<<<<< HEAD
    message.error('密码长度需不少于六位')
    return false
  }

  router.push('/')

=======
    message.error('密码长度错误')
  }

>>>>>>> 78a4a9e581c1967243664132e050f22ba2318007
  return true
}
</script>

<template>
  <div w-screen h-screen flex="~ col" justify-center items-center gap="4">
    <div>
      <n-image :src="logo" height="150" preview-disabled />
    </div>

    <div flex="~ col" gap="4">
      <n-input
        v-model:value="formValue.user"
        w-full
        placeholder="请输入用户名"
        @keydown.enter.prevent
      >
        <template #prefix> <n-icon :component="User" /> </template>
      </n-input>

      <n-input
        v-model:value="formValue.password"
        w-full
        type="password"
        show-password-on="mousedown"
        placeholder="请输入密码"
        @keydown.enter.prevent
      >
        <template #prefix> <n-icon :component="Lock" /> </template>
      </n-input>

      <n-button
        type="primary"
        size="large"
        w-full
        @click="validateForm(formValue)"
      >
        登录
      </n-button>

      <div flex="~ row" justify-between>
<<<<<<< HEAD
        <!-- <n-button text @click="router.push('/password_reset')">
          忘记密码
        </n-button> -->
=======
        <n-button text @click="router.push('/password_reset')">
          忘记密码
        </n-button>
>>>>>>> 78a4a9e581c1967243664132e050f22ba2318007
        <n-button text @click="router.push('/register')"> 注册账号</n-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
