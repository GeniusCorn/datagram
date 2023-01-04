<script setup lang="ts">
import DashboardsService from '@/service/dashboards'
import { Icon } from '@vicons/utils'
import { Dots, Edit, CursorText, Share, SquareX } from '@vicons/tabler'
// @ts-ignore
import VueDragResize from 'vue-drag-resize'
import { useDataStore } from '@/store'
import type { Component } from 'vue'
import router from '@/router'

const store = useDataStore()

const account = $ref(localStorage.getItem('account') as string)

const res = await DashboardsService.getDashboardByOwner(account)
let dashboards = $ref(res.data.data)

const canvas: HTMLElement | undefined = $ref()

let clientWidth: number | undefined = $ref()
let clientHeight: number | undefined = $ref()
const scale: number = $ref(1)

onMounted(() => {
  clientWidth = canvas?.clientWidth
  clientHeight = canvas?.clientHeight

  window.addEventListener('resize', () => {
    clientWidth = canvas?.clientWidth
    clientHeight = canvas?.clientHeight
  })
})

// add new dashboard start
let showModal = $ref(false)
function toggleModal() {
  showModal = !showModal
}

let newDashboardName = $ref('')

async function submitDashboard() {
  if (validateDashboardName(newDashboardName)) {
    const res1 = await DashboardsService.createDashboard(
      account,
      newDashboardName
    )

    if (res1.data.code === 1) {
      window.$message?.error(res1.data.message)
      return false
    } else {
      window.$message?.success(res1.data.message)
      newDashboardName = ''

      updateData()
      return true
    }
  } else {
    return false
  }
}

function validateDashboardName(name: string): boolean {
  if (name.length === 0) {
    window.$message?.error('请输入仪表盘名称')
    return false
  }

  if (name.length > 10) {
    window.$message?.error('仪表盘名称不能大于十个字符')
    return false
  }

  return true
}
// add new dashboard end

// select dashboard start
let currentDashboardID: number | undefined = $ref(undefined)

async function selectDashboard(id: number) {
  if (id === currentDashboardID) {
    return
  }

  currentDashboardID = id
  const res = await DashboardsService.getDashboardByID(id)
  const data = res.data.data.at(0).data

  if (data !== null) {
    store.elementsList = JSON.parse(res.data.data.at(0).data)
  } else {
    store.elementsList = []
  }
}

async function updateData() {
  const res = await DashboardsService.getDashboardByOwner(account)
  dashboards = res.data.data
}
// select dashboard end

// dropdown start
function renderIcon(icon: Component) {
  return () => {
    return h(Icon, null, {
      default: () => h(icon)
    })
  }
}

const dropdownOptions = [
  {
    label: '编辑',
    key: 'edit',
    icon: renderIcon(Edit)
  },
  {
    label: '分享',
    key: 'share',
    icon: renderIcon(Share)
  },
  {
    label: '重命名',
    key: 'rename',
    icon: renderIcon(CursorText)
  },
  {
    label: '删除',
    key: 'delete',
    icon: renderIcon(SquareX)
  }
]

function handleSelect(key: string): void {
  switch (key) {
    case 'edit':
      router.push('/dashboard/canvas')
      break

    case 'share':
      router.push('share')
      break

    case 'rename':
      router.push('rename')
      break

    case 'delete':
      router.push('delete')
      break

    default:
      break
  }
}
// dropdown end
</script>

<template>
  <n-layout>
    <n-layout-header>
      <Navbar />
    </n-layout-header>
    <n-layout-content>
      <div h="[calc(100vh-3rem)]" flex="~ row" overflow-hidden>
        <div w-60 h-full border="r gray" p-4 box-border flex="~ col" gap-4>
          <div flex="~ row" justify-between items-center>
            <h2>仪表盘</h2>

            <n-button
              icon-placement="right"
              type="primary"
              size="small"
              @click="toggleModal"
            >
              添加
            </n-button>
          </div>

          <div h-full overflow-y-auto overflow-x-hidden flex="~ col" gap-4>
            <div
              v-for="(dashboard, index) in dashboards"
              :key="index"
              hover="text-[#36ad2a]"
              cursor-pointer
              grid="~ cols-3"
              :class="{ 'text-[#36ad2a]': dashboard.id === currentDashboardID }"
              @click="selectDashboard(dashboard.id)"
            >
              <div>
                {{ index + 1 }}
              </div>
              <div>
                {{ dashboard.name }}
              </div>
              <div w-full text-right>
                <n-dropdown
                  :options="dropdownOptions"
                  trigger="click"
                  @select="handleSelect"
                >
                  <Icon>
                    <Dots />
                  </Icon>
                </n-dropdown>
              </div>
            </div>
          </div>
        </div>

        <div w-full overflow-auto>
          <div
            v-if="store.elementsList.length !== 0"
            id="canvas"
            ref="canvas"
            absolute
            bg-gray-100
            w="[1920px]"
            h="[1080px]"
            transform-origin-left-top
            :style="{ transform: `scale(${scale})` }"
          >
            <VueDragResize
              v-for="(element, index) in store.elementsList"
              :key="element.id"
              :x="element.drag.x"
              :y="element.drag.y"
              :w="element.drag.width"
              :h="element.drag.height"
              :parent-limitation="true"
              :parent-w="clientWidth"
              :parent-h="clientHeight"
              :parent-scale-x="scale"
              :parent-scale-y="scale"
              :is-draggable="false"
              :is-resizable="false"
              :is-active="element.drag.isActive"
            >
              <component :is="element.cpt.type" ref="itemRefs" :index="index" />
            </VueDragResize>
          </div>
          <div
            v-else
            text-gray
            h-full
            flex="~"
            justify-center
            items-center
            text-2xl
          >
            这是一个空的仪表盘，赶快编辑加入一些新的内容吧~
          </div>
        </div>

        <div
          v-if="store.elementsList.length !== 0"
          absolute
          bottom-1
          left-60
          w-30
        >
          <n-slider v-model:value="scale" :max="1" :min="0.1" :step="0.01" />
        </div>
      </div>
    </n-layout-content>
  </n-layout>

  <!-- add new dashboard -->
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    :show-icon="false"
    title="新建仪表盘"
    positive-text="确认"
    negative-text="取消"
    @positive-click="submitDashboard"
  >
    <n-text>仪表盘名称</n-text>
    <n-input v-model:value="newDashboardName" placeholder="请输入仪表盘名称" />
  </n-modal>
</template>
