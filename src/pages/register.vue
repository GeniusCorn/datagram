<script setup lang="ts">
import logo from '@/assets/logo.png'
import router from '@/router'
import { User, Lock } from '@vicons/tabler'
import { useMessage } from 'naive-ui'

const message = useMessage()

interface Form {
  user: string
  password: string
  passwordRepeat: string
}

const formValue: Form = $ref({
  user: '',
  password: '',
  passwordRepeat: ''
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
    message.error('密码长度需不少于六位')
    return false
  }

  if (formValue.password !== formValue.passwordRepeat) {
    message.error('两次密码输入不一致')
    return false
  }

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

      <n-input
        v-model:value="formValue.passwordRepeat"
        w-full
        type="password"
        show-password-on="mousedown"
        placeholder="请再次输入密码"
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
        注册
      </n-button>

      <div flex="~ row" justify-between>
        <n-button text @click="router.push('/login')"> 返回登录 </n-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>