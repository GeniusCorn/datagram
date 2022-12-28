<script setup lang="ts">
import UsersService from '@/service/users'

interface Form {
  phone: string
}

const formValue: Form = $ref({
  phone: ''
})

const account: string = $ref(localStorage.getItem('account') as string)

const res = await UsersService.getUser(account)

const data = res.data.data.at(0)

formValue.phone = data.phone

const options = $ref([
  {
    label: '免费用户',
    value: 'user'
  },
  {
    label: '付费用户',
    value: 'vip'
  },
  {
    label: '管理员',
    value: 'admin'
  }
])

async function submitForm(formValue: Form) {
  if (validateForm(formValue)) {
    const res = await UsersService.updatePhone(account, formValue.phone)

    if (res.data.code === 0) {
      window.$message?.success(res.data.message)
    }
  }
}

function validateForm(formValue: Form): boolean {
  if (formValue.phone !== '' && formValue.phone.length !== 11) {
    window.$message?.error('手机号码格式错误')
    return false
  }

  return true
}
</script>

<template>
  <div flex="~" justify-center>
    <n-card title="个人信息" w-100>
      <n-form label-width="auto">
        <n-form-item label="用户名">
          <n-input
            v-model:value="account"
            placeholder="用户名"
            :disabled="true"
          />
        </n-form-item>

        <n-form-item label="电话">
          <n-input v-model:value="formValue.phone" placeholder="请输入电话" />
        </n-form-item>

        <n-form-item label="角色">
          <n-select
            v-model:value="data.authority"
            :options="options"
            disabled
          />
        </n-form-item>

        <n-button type="primary" w-full @click="submitForm(formValue)">
          更新个人信息
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
