<script setup lang="ts">
import router from '@/router'
import UsersService from '@/service/users'

interface Form {
  password: string
  newPassword: string
  newPasswordRepeat: string
}

const formValue: Form = $ref({
  password: '',
  newPassword: '',
  newPasswordRepeat: ''
})

async function submitForm(formValue: Form) {
  if (validateForm(formValue)) {
    const account = localStorage.getItem('account') as string
    const res = await UsersService.updatePassword(
      account,
      formValue.password,
      formValue.newPassword
    )

    if (res.data.code === 1) {
      window.$message?.error(res.data.message)
    } else {
      clearForm()
      window.$message?.success(res.data.message)

      localStorage.removeItem('account')
      localStorage.removeItem('token')

      router.push('/login')
    }
  }
}

function clearForm() {
  formValue.password = ''
  formValue.newPassword = ''
  formValue.newPasswordRepeat = ''
}

function validateForm(formValue: Form): boolean {
  if (formValue.password.length === 0) {
    window.$message?.error('请输入原始密码')
    return false
  }

  if (formValue.password.length < 6) {
    window.$message?.error('密码长度需不少于六位')
    return false
  }

  if (formValue.newPassword !== formValue.newPasswordRepeat) {
    window.$message?.error('两次密码输入不一致')
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
            v-model:value="formValue.password"
            type="password"
            placeholder="请输入原始密码"
            show-password-on="mousedown"
          />
        </n-form-item>

        <n-form-item label="新密码">
          <n-input
            v-model:value="formValue.newPassword"
            type="password"
            placeholder="请输入新密码"
            show-password-on="mousedown"
          />
        </n-form-item>

        <n-form-item label="确认密码">
          <n-input
            v-model:value="formValue.newPasswordRepeat"
            type="password"
            placeholder="请再次输入密码"
            show-password-on="mousedown"
          />
        </n-form-item>

        <n-button type="primary" w-full @click="submitForm(formValue)">
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
