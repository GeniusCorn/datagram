<script setup lang="ts">
import { useDataStore } from '@/store'
const store = useDataStore()

const props = defineProps<{
  index: number
}>()

let legendEnabled: boolean = $ref(false)

onMounted(() => {
  if (store.elementsList[props.index].cpt.options.legend === false)
    legendEnabled = false
  else legendEnabled = true
})

onUpdated(() => {
  if (store.elementsList[props.index].cpt.options.legend === false)
    legendEnabled = false
  else legendEnabled = true
})

function handleChange(value: boolean) {
  if (value === true)
    store.elementsList[props.index].cpt.options.legend = {
      layout: 'horizontal',
      position: 'bottom',
      offsetX: 0,
      offsetY: 0,
      flipPage: false
    }
  else store.elementsList[props.index].cpt.options.legend = false
}

const layoutOptions = $ref([
  {
    label: '横向布局',
    value: 'horizontal'
  },
  { label: '纵向布局', value: 'vertical' }
])

const positionOptions = $ref([
  { label: '置顶', value: 'top' },
  { label: '置底', value: 'bottom' },
  { label: '居左', value: 'left' },
  { label: '居右', value: 'right' }
])
</script>

<template>
  <n-collapse-item title="图例" name="legend">
    <n-form w-full label-placement="left" label-width="auto" size="medium">
      <n-form-item label="图例开关">
        <n-switch v-model:value="legendEnabled" @update:value="handleChange" />
      </n-form-item>

      <template v-if="legendEnabled">
        <n-form-item label="布局方式">
          <n-select
            v-model:value="
              store.elementsList[props.index].cpt.options.legend.layout
            "
            :options="layoutOptions"
            placeholder="请选择"
          />
        </n-form-item>

        <n-form-item label="图例位置">
          <n-select
            v-model:value="
              store.elementsList[props.index].cpt.options.legend.position
            "
            default-value="bottom"
            :options="positionOptions"
            placeholder="请选择"
          />
        </n-form-item>

        <n-form-item label="X 方向偏移">
          <n-input-number
            v-model:value="
              store.elementsList[props.index].cpt.options.legend.offsetX
            "
            placeholder="请输入"
          />
        </n-form-item>

        <n-form-item label="Y 方向偏移">
          <n-input-number
            v-model:value="
              store.elementsList[props.index].cpt.options.legend.offsetY
            "
            placeholder="请输入"
          />
        </n-form-item>

        <n-form-item label="图例分页">
          <n-switch
            v-model:value="
              store.elementsList[props.index].cpt.options.legend.flipPage
            "
          />
        </n-form-item>
      </template>
    </n-form>
  </n-collapse-item>
</template>

<style scoped></style>
