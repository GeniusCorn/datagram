<script setup lang="ts">
import { useDataStore } from '@/store'

const props = defineProps<{
  index: number
}>()

const store = useDataStore()

onMounted(() => {
  checkStatus()
})

onUpdated(() => {
  checkStatus()
})

let pointEnabled: boolean = $ref(false)

function checkStatus() {
  !store.elementsList[props.index].cpt.options.point
    ? (pointEnabled = false)
    : (pointEnabled = true)
}

function handlePointChange(value: boolean) {
  value
    ? (store.elementsList[props.index].cpt.options.point = {
        shape: 'circle',
        size: 4,
        style: {}
      })
    : (store.elementsList[props.index].cpt.options.point = false)
}

const shapeOptions = $ref([
  {
    label: '圆',
    value: 'circle'
  },
  {
    label: '方',
    value: 'square'
  },
  {
    label: '领带',
    value: 'bowtie'
  },
  {
    label: '钻石',
    value: 'diamond'
  },
  {
    label: '六边形',
    value: 'hexagon'
  },
  {
    label: '三角形',
    value: 'triangle'
  },
  {
    label: '倒三角形',
    value: 'triangle-down'
  }
])
</script>

<template>
  <n-collapse-item title="数据点" name="point">
    <n-form>
      <n-form-item label="数据点显示" label-placement="left">
        <n-switch
          v-model:value="pointEnabled"
          @update:value="handlePointChange"
        />
      </n-form-item>

      <template
        v-if="store.elementsList[props.index].cpt.options.point !== false"
      >
        <n-form-item label="形状">
          <n-select
            v-model:value="
              store.elementsList[props.index].cpt.options.point.shape
            "
            :options="shapeOptions"
          />
        </n-form-item>

        <n-form-item label="大小">
          <n-input-number
            v-model:value="
              store.elementsList[props.index].cpt.options.point.size
            "
            :validator="(x: number) => x > 0"
            placeholder="请输入数字"
            w-full
          />
        </n-form-item>

        <!-- FIXME: color picker -->
        <!-- <n-form-item label="颜色">
          <n-color-picker
            v-model:value="
              store.elementsList[props.index].cpt.options.point.style.stroke
            "
          />
        </n-form-item> -->
      </template>
    </n-form>
  </n-collapse-item>
</template>

<style scoped></style>
