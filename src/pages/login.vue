<script setup lang="ts">
import logo from '@/assets/logo.png'
import router from '@/router'
import { User, Lock } from '@vicons/tabler'
import SessionService from '@/service/session'

interface Form {
  account: string
  password: string
}

const formValue: Form = $ref({
  account: '',
  password: ''
})

async function loginUser(formValue: Form) {
  if (validateForm(formValue)) {
    const res = await SessionService.login(
      formValue.account,
      formValue.password
    )

    if (res.data.code === 0) {
      localStorage.setItem('token', res.data.data.token)
      localStorage.setItem('account', formValue.account)

      window.$message?.success(res.data.message)

      router.push('/')
    }
  }
}

function validateForm(formValue: Form): boolean {
  if (formValue.account.length === 0) {
    window.$message?.error('请输入用户名')
    return false
  }

  if (formValue.password.length === 0) {
    window.$message?.error('请输入密码')
    return false
  }

  if (formValue.password.length < 6) {
    window.$message?.error('密码长度需不少于六位')
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
        v-model:value="formValue.account"
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
        @click="loginUser(formValue)"
      >
        登录
      </n-button>

      <div flex="~ row" justify-between>
        <!-- <n-button text @click="router.push('/password_reset')">
          忘记密码
        </n-button> -->
        <n-button text @click="router.push('/register')"> 注册账号</n-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
