<script setup lang="ts">
import { useDataStore } from '@/store'

const store = useDataStore()

const props = defineProps<{
  index: number
}>()

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
</script>

<template>
  <n-collapse accordion>
    <n-collapse-item title="图表" name="chart">
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
      </n-form>
    </n-collapse-item>

    <n-collapse-item title="折线样式" name="lineStyle">
      <n-form>
        <n-form-item label="线宽">
          <n-input-number
            v-model:value="
              store.elementsList[props.index].cpt.options.lineStyle.lineWidth
            "
            :validator="(x: number) => x > 0"
            placeholder="请输入数字"
            w-full
          />
        </n-form-item>

        <n-form-item label="颜色">
          <n-color-picker
            v-model:value="
              store.elementsList[props.index].cpt.options.lineStyle.stroke
            "
          />
        </n-form-item>

        <n-form-item label="透明度">
          <n-input-number
            v-model:value="
              store.elementsList[props.index].cpt.options.lineStyle
                .strokeOpacity
            "
            :step="0.1"
            :min="0"
            :max="1"
            :validator="(x: number) => x > 0"
          />
        </n-form-item>
      </n-form>
    </n-collapse-item>

    <PointConfig :index="props.index" />

    <LabelConfig :index="props.index" />

    <AxisConfig :index="props.index" />

    <template
      v-if="store.elementsList[props.index].cpt.type === 'MultipleLineChart'"
    >
      <LegendConfig :index="props.index" />
    </template>
  </n-collapse>
</template>

<style scoped></style>
