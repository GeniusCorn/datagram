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

      newDashboardName = ''
      return false
    } else {
      window.$message?.success(res1.data.message)
      newDashboardName = ''

      updateData()
      return true
    }
  } else {
    newDashboardName = ''
    return false
  }
}

function validateDashboardName(name: string): boolean {
  for (let i = 0; i < dashboards.length; i += 1) {
    if (dashboards[i].name === newDashboardName) {
      window.$message?.error('当前仪表盘名称已存在')

      return false
    }
  }

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
let currentDashboardIndex: number | undefined = $ref(undefined)

async function selectDashboard(id: number, index: number) {
  if (id === currentDashboardID) {
    return
  }

  currentDashboardIndex = index

  currentDashboardID = id
  const res = await DashboardsService.getDashboardByID(id)
  const data = res.data.data.at(0).data

  if (data !== null) {
    store.elementsList = JSON.parse(res.data.data.at(0).data)
  } else {
    store.elementsList = []
  }

  const value = JSON.stringify(store.elementsList)

  localStorage.removeItem('elementsList')
  localStorage.setItem('elementsList', value)
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

async function handleSelect(key: string): Promise<void> {
  switch (key) {
    case 'edit':
      router.push(`/dashboard/canvas/${currentDashboardID}`)
      break

    case 'share':
      showShareModal = true
      break

    case 'rename':
      renameDashboardModal = true
      break

    case 'delete':
      deleteDashboard()
      break

    default:
      break
  }
}

let renameDashboardModal = $ref(false)

async function renameDashboard(id: number, name: string) {
  if (validateDashboardName(newDashboardName)) {
    const res1 = await DashboardsService.renameDashboard(id, name)

    if (res1.data.code === 0) {
      window.$message?.success(res1.data.message)
    }
  } else {
    return false
  }

  newDashboardName = ''
  updateData()
}

async function deleteDashboard() {
  const res1 = await DashboardsService.deleteDashboard(
    currentDashboardID as number
  )

  if (res1.data.code === 0) {
    window.$message?.success(res1.data.message)
  }

  updateData()
}
// dropdown end

// share dashboard start
let showShareModal: boolean = $ref(false)
let enableShare: boolean = $ref(false)
let shareLink: string = $ref('')

function onShowShareModal() {
  const currentDashboard = dashboards.at(currentDashboardIndex)

  currentDashboard.share === 1 ? (enableShare = true) : (enableShare = false)

  shareLink = `${window.location.href}/canvas/share/${currentDashboard.share_token}`
}

async function toggleShareSwitch(value: boolean) {
  enableShare = value

  const res = await DashboardsService.toggleShareDashboard(
    currentDashboardID as number,
    value
  )

  if (res.data.code !== 0) {
    window.$message?.error(res.data.message)
  }
}

function onCopyToClipboard() {
  navigator.clipboard.writeText(shareLink)

  window.$message?.success('链接地址已复制到剪贴板')
}
// share dashboard end

async function updateData() {
  const res = await DashboardsService.getDashboardByOwner(account)
  dashboards = res.data.data
}
</script>

<template>
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
          flex="~ row"
          gap-2
          transition
          duration-200
          ease-in-out
          :class="{ 'text-[#36ad2a]': dashboard.id === currentDashboardID }"
          @click="selectDashboard(dashboard.id, index)"
        >
          <div>{{ index + 1 }}.</div>
          <div w-full>
            {{ dashboard.name }}
          </div>
          <div text-right>
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
        v-if="currentDashboardID !== undefined"
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
    </div>

    <div v-if="currentDashboardID !== undefined" absolute bottom-1 left-60 w-30>
      <n-slider v-model:value="scale" :max="1" :min="0.1" :step="0.01" />
    </div>
  </div>

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

  <!-- rename dashboard -->
  <n-modal
    v-model:show="renameDashboardModal"
    :mask-closable="false"
    preset="dialog"
    :show-icon="false"
    title="重命名仪表盘"
    positive-text="确认"
    negative-text="取消"
    @positive-click="
      renameDashboard(currentDashboardID as number, newDashboardName)
    "
  >
    <n-input v-model:value="newDashboardName" placeholder="请输入仪表盘名称" />
  </n-modal>

  <!-- share dashboard -->
  <n-modal
    v-model:show="showShareModal"
    :mask-closable="false"
    preset="dialog"
    :show-icon="false"
    title="分享仪表盘"
    :on-after-enter="onShowShareModal"
  >
    <n-form-item label="链接分享" label-placement="left">
      <n-switch
        v-model:value="enableShare"
        :on-update:value="toggleShareSwitch"
      />
    </n-form-item>

    <template v-if="enableShare">
      <n-form-item label="" label-placement="left">
        <n-text depth="3" text-center>
          开启链接后，任何人可通过此链接访问仪表盘。
        </n-text>
      </n-form-item>

      <n-form-item label="链接" label-placement="left">
        <n-input v-model:value="shareLink" disabled placeholder="链接" />
      </n-form-item>

      <n-button type="primary" float-right @click="onCopyToClipboard">
        复制链接
      </n-button>
    </template>
  </n-modal>
</template>

<route lang="yaml">
meta:
  layout: common
</route>
