<script setup lang="ts">
import type { CptName, CptConfigName } from '@/types/Element.js'
import { useDataStore } from '@/store/index'
import ChartData from '@/components/dashboard/rightBar/data/ChartData.vue'
import DatasetsService from '@/service/datasets'
import { SelectOption } from 'naive-ui'

const account = localStorage.getItem('account') as string

const store = useDataStore()

let index: number = $ref(0)

const cptTypeToConfig = new Map<CptName, CptConfigName>()
  .set('LineChart', 'LineConfig')
  .set('MultipleLineChart', 'LineConfig')
  .set('AreaChart', 'AreaConfig')
  .set('ColumnChart', 'ColumnConfig')
  .set('GroupedColumnChart', 'ColumnConfig')
  .set('StackedColumnChart', 'ColumnConfig')
  .set('WaterFallChart', 'WaterFallConfig')
  .set('BarChart', 'ColumnConfig')
  .set('PieChart', 'PieConfig')
  .set('RoseChart', 'PieConfig')
  .set('RadarChart', 'RadarConfig')
  .set('TextCpt', 'TextConfig')

const cptTypeToData = new Map().set('TextCpt', 'TextData')

watch(store.elementsList, () => {
  for (let i = 0; i < store.elementsList.length; i += 1) {
    if (store.elementsList[i].drag.isActive === true) index = i
  }
})

const emit = defineEmits(['update'])

function updateData() {
  emit('update')
}

// select dataset start
const res = await DatasetsService.getDatasetByOwner(account)
const datasets = $ref(res.data.data)

const selectOptions: SelectOption[] = $ref([])

for (let i = 0; i < datasets.length; i += 1) {
  selectOptions.push({
    label: datasets[i].name,
    value: i
  })
}

let selectedDatasetData = $ref([])

function handleUpdateValue(value: string) {
  const index = parseInt(value)
  selectedDatasetData = JSON.parse(datasets[index].data)
}

const chartDataRef: any = $ref()

function importData() {
  if (selectedDatasetData.length === 0) {
    window.$message?.error(`请选择一个数据集`)
    return false
  }

  store.elementsList[index].cpt.data = selectedDatasetData
  store.elementsList[index].cpt.options.data = selectedDatasetData
  updateData()
  chartDataRef.loadData()
  window.$message?.success('导入数据成功')
}
// select dataset end
</script>

<template>
  <div w-60 h-full bg="[#f8f9fa]" px-4 overflow-y-scroll z-14>
    <template v-if="store.currentElement !== -1">
      <n-tabs
        default-value="coordinate"
        justify-content="space-evenly"
        type="line"
      >
        <n-tab-pane name="coordinate" tab="坐标">
          <CoordinateConfig :index="index" />
        </n-tab-pane>

        <n-tab-pane name="config" tab="属性">
          <component
            :is="cptTypeToConfig.get(store.elementsList[index].cpt.type)"
            :index="index"
          />

          <br />
          <OperateElement :index="index" />

          <br />
        </n-tab-pane>

        <n-tab-pane name="data" tab="数据">
          <n-collapse>
            <n-collapse-item title="导入数据集" name="import">
              <template v-if="store.elementsList[index].cpt.type !== 'TextCpt'">
                <n-form-item label="选择数据集">
                  <n-select
                    :default-value="undefined"
                    :options="selectOptions"
                    placeholder="请选择数据集"
                    @update:value="handleUpdateValue"
                  />
                </n-form-item>

                <n-button type="primary" w-full mb-24px @click="importData">
                  导入数据
                </n-button>
              </template>
            </n-collapse-item>

            <n-collapse-item title="编辑数据" name="edit">
              <component
                :is="
                  cptTypeToData.get(store.elementsList[index].cpt.type) ||
                  ChartData
                "
                ref="chartDataRef"
                :index="index"
                @update="updateData"
              />
            </n-collapse-item>
          </n-collapse>
          <br />
        </n-tab-pane>
      </n-tabs>
    </template>
  </div>
</template>

<style scoped></style>
