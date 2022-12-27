<script setup lang="ts">
interface Form {
  phone: string
}

const formValue: Form = $ref({
  phone: ''
})

const options = $ref([
  {
    label: '免费用户',
    value: 'free'
  },
  {
    label: '付费用户',
    value: 'paid'
  },
  {
    label: '管理员',
    value: 'admin'
  }
])

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
          <n-input placeholder="用户名" :disabled="true" />
        </n-form-item>

        <n-form-item label="电话">
          <n-input v-model:value="formValue.phone" placeholder="请输入电话" />
        </n-form-item>

        <n-form-item label="角色">
          <n-select :options="options" default-value="free" disabled />
        </n-form-item>

        <n-button type="primary" w-full @click="validateForm(formValue)">
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
