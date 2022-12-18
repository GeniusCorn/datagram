<script setup lang="ts">
import logo from '@/assets/logo.png'
import admin from '@/assets/home/admin.png'
import chart from '@/assets/home/pie-chart.png'
import data from '@/assets/home/data.png'
</script>

<template>
  <div>
    <n-space vertical size="large">
      <n-card bg-gray-100>
        <div flex="~ row" items-center justify-around>
          <div flex="~ col" gap-6>
            <div font-bold text-6xl>欢迎使用 DataGram</div>
            <div text-2xl>现代数据可视化工具</div>
          </div>

          <n-image :src="logo" height="300" width="300" preview-disabled />
        </div>
      </n-card>

      <div w-full flex="~" gap-4>
        <n-card title="系统管理" bg-gray-100>
          <div flex="~" justify-between>
            <div>
              <p>用户管理：支持用户注册、登录、修改密码等；</p>
              <p>
                权限管理：支持控制用户创建仪表盘的权限。非付费用户只允许创建至多两个仪表盘，付费用户允许创建无限的仪表盘；
              </p>
              <p>操作日志：支持系统操作日志的记录、查看、搜索。</p>
            </div>

            <n-image :src="admin" height="100" width="100" preview-disabled />
          </div>
        </n-card>

        <n-card title="图表制作" bg-gray-100>
          <div flex="~" justify-between>
            <div>
              <p>支持仪表盘的新建、重命名、删除等；</p>
              <p>支持在线使用拖拉拽的方式快速构建仪表盘；</p>
              <p>支持图表样式设置；</p>
              <p>支持将仪表盘导出为图片；</p>
              <p>支持创建公共链接分享仪表盘。</p>
            </div>

            <n-image :src="chart" height="100" width="100" preview-disabled />
          </div>
        </n-card>

        <n-card title="数据连接" bg-gray-100>
          <div flex="~" justify-between>
            <div>
              <p>支持多种数据集，如 Excel 文件及 API 数据源等；</p>
              <p>支持上传并在云端管理数据源。</p>
            </div>

            <n-image :src="data" width="100" preview-disabled />
          </div>
        </n-card>
      </div>
    </n-space>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: home
</route>
