<script setup lang="ts">
import UsersService from '@/service/users'
import RecordsService from '@/service/records'

const res = await UsersService.getAllUser()
const userData = res.data.data

const res1 = await RecordsService.getAllRecords()
let recordsData = $ref(res1.data.data)

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

  const res = await RecordsService.getAllRecords()
  recordsData = res.data.data

  if (res1.data.code === 0) {
    window.$message?.success(res1.data.message)
  }
}

const columns = $ref([
  { title: 'id', key: 'id' },
  {
    title: '操作用户',
    key: 'account'
  },
  {
    title: '操作',
    key: 'operation'
  },
  {
    title: '时间',
    key: 'create_time'
  }
])

let displayData: any[] = $ref([])

function computeData() {
  const array: any[] = []

  recordsData.forEach((element: any) => {
    element.create_time = new Date(element.create_time).toLocaleString(
      'chinese',
      {
        timeZone: 'asia/Shanghai'
      }
    )

    array.push(element)
  })

  displayData = array
}

computeData()

watch(
  () => recordsData,
  () => {
    computeData()
  }
)

let searchInputText: string = $ref('')

function onSearch() {
  const temp: any[] = []

  recordsData.forEach((element: any) => {
    const searchItem = element.account.toString()

    if (searchItem.includes(searchInputText)) {
      temp.push(element)
    }
  })

  displayData = temp
}

function onReset() {
  computeData()
  searchInputText = ''
}
</script>

<template>
  <div flex="~ row" justify-center gap-4>
    <n-card title="账号信息" w-200 h-200 overflow-y-auto>
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

    <n-card title="操作日志" w-200 h-200>
      <div flex="~ col" gap-2>
        <div flex gap-2>
          <n-select disabled default-value="操作用户" w-min />
          <n-input v-model:value="searchInputText" placeholder="搜索内容" />
          <n-button type="primary" @click="onSearch">搜索</n-button>
          <n-button type="info" @click="onReset">重置</n-button>
        </div>

        <n-data-table
          :columns="columns"
          :data="displayData"
          :pagination="{ pageSize: 10 }"
        />
      </div>
    </n-card>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: home
</route>
