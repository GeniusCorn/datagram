<script setup lang="ts">
import router from '@/router/index'
import { Icon } from '@vicons/utils'
import { ChevronLeft } from '@vicons/tabler'
import { useRoute } from 'vue-router'

const route = useRoute()

let title: string = $ref('')

function getUploadType(path: string): void {
  const type: string | undefined = path.split('/').at(-1)

  switch (type) {
    case 'excel':
      title = '添加 Excel 数据集'
      break
    case 'api':
      title = '添加 Api 数据集'
      break

    default:
      break
  }
}

onMounted(() => {
  getUploadType(route.path)
})
</script>

<template>
  <div
    flex="~ row"
    justify-between
    items-center
    border="b gray"
    box-border
    h-12
    px-10
  >
    <div flex="~ row" justify-center items-center gap-4>
      <n-button text @click="router.push('/dataset')">
        <Icon>
          <ChevronLeft />
        </Icon>
      </n-button>

      <div>{{ title }}</div>
    </div>
  </div>
</template>

<style scoped></style>
