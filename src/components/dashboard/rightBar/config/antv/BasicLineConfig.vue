<script setup lang="ts">
import { useDataStore } from '@/store'

const store = useDataStore()

const props = defineProps<{
  index: number
}>()

let pointEnabled: boolean = $ref(false)

onMounted(() => {
  checkStatus()
})

onUpdated(() => {
  checkStatus()
})

function checkStatus() {
  !store.elementsList[props.index].cpt.options.point
    ? (pointEnabled = false)
    : (pointEnabled = true)
}

function handlePointChange(value: boolean) {
  value
    ? (store.elementsList[props.index].cpt.options.point = {
        shape: 'circle',
        size: 2
      })
    : (store.elementsList[props.index].cpt.options.point = false)
}

const stepTypeOptions = $ref([
  {
    label: '无',
    value: ''
  },
  {
    label: 'hv',
    value: 'hv'
  },
  {
    label: 'vh',
    value: 'vh'
  },
  {
    label: 'hvh',
    value: 'hvh'
  },
  {
    label: 'vhv',
    value: 'vhv'
  }
])

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
  <n-form w-full label-width="auto" size="medium">
    <n-form-item label="阶梯类型">
      <n-select
        v-model:value="store.elementsList[props.index].cpt.options.stepType"
        placeholder="无"
        :options="stepTypeOptions"
        :default-value="undefined"
      />
    </n-form-item>

    <n-form-item
      v-if="store.elementsList[props.index].cpt.options.stepType === ''"
      label="曲线平滑"
      label-placement="left"
    >
      <n-switch
        v-model:value="store.elementsList[props.index].cpt.options.smooth"
      />
    </n-form-item>

    <LabelConfig :index="props.index" />
  </n-form>

  <n-collapse accordion>
    <AxisConfig :index="props.index" />

    <n-collapse-item title="数据点" name="point">
      <n-form w-full label-width="auto" size="medium">
        <n-form-item label="数据点显示" label-placement="left">
          <n-switch
            v-model:value="pointEnabled"
            @update:value="handlePointChange"
          />
        </n-form-item>
      </n-form>

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
      </template>
    </n-collapse-item>

    <template
      v-if="store.elementsList[props.index].cpt.type === 'MultipleLine'"
    >
      <LegendConfig :index="props.index" />
    </template>
  </n-collapse>
</template>

<style scoped></style>
