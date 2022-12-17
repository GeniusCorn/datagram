<script setup lang="ts">
import { useMessage } from 'naive-ui'

const message = useMessage()

interface Form {
  originalPassword: string
  password: string
  passwordRepeat: string
}

const formValue: Form = $ref({
  originalPassword: '',
  password: '',
  passwordRepeat: ''
})

function validateForm(formValue: Form): boolean {
  if (formValue.originalPassword.length === 0) {
    message.error('请输入原始密码')
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
  <div flex="~" justify-center>
    <n-card title="个人信息" w-100>
      <n-form label-width="auto">
        <n-form-item label="原始密码">
          <n-input
            v-model:value="formValue.originalPassword"
            type="password"
            placeholder="请输入原始密码"
            show-password-on="mousedown"
          />
        </n-form-item>

        <n-form-item label="新密码">
          <n-input
            v-model:value="formValue.password"
            type="password"
            placeholder="请输入新密码"
            show-password-on="mousedown"
          />
        </n-form-item>

        <n-form-item label="确认密码">
          <n-input
            v-model:value="formValue.passwordRepeat"
            type="password"
            placeholder="请再次输入密码"
            show-password-on="mousedown"
          />
        </n-form-item>

        <n-button type="primary" w-full @click="validateForm(formValue)">
          确认修改密码
        </n-button>
      </n-form>
    </n-card>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: home
</route>
