<script setup lang="ts">
import UsersService from '@/service/users'

const res = await UsersService.getAllUser()
const userData = res.data.data

const authorityOptions = $ref([
  {
    label: '普通用户',
    value: 'user'
  },
  {
    label: '付费用户',
    value: 'vip'
  },
  {
    label: '管理员',
    value: 'admin',
    disabled: true
  }
])

async function updateAuthority(account: string, value: string) {
  const res1 = await UsersService.updateAuthority(account, value)

  if (res1.data.code === 0) {
    window.$message?.success(res1.data.message)
  }
}
</script>

<template>
  <div flex="~" justify-center>
    <n-card title="账号信息" w-200>
      <n-table>
        <thead>
          <tr>
            <th>id</th>
            <th>账户名</th>
            <th>手机号码</th>
            <th>权限组</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in userData" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.account }}</td>
            <td>{{ item.phone }}</td>
            <td>
              <n-select
                :options="authorityOptions"
                :default-value="item.authority"
                @update:value="(value: string) => {
                  updateAuthority(item.account, value)
                }"
              />
            </td>
          </tr>
        </tbody>
      </n-table>
    </n-card>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: home
</route>
