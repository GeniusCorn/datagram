import { app } from '@/main'

import LineChart from '@/components/dashboard/cpt/antv/LineChart.vue'
import MultipleLineChart from '@/components/dashboard/cpt/antv/MultipleLineChart.vue'
import AreaChart from '@/components/dashboard/cpt/antv/AreaChart.vue'
import ColumnChart from '@/components/dashboard/cpt/antv/ColumnChart.vue'
import GroupedColumn from '@/components/dashboard/cpt/antv/GroupedColumn.vue'
import StackedColumn from '@/components/dashboard/cpt/antv/StackedColumn.vue'
import WaterFallChart from '@/components/dashboard/cpt/antv/WaterFallChart.vue'
import BarChart from '@/components/dashboard/cpt/antv/BarChart.vue'
import PieChart from '@/components/dashboard/cpt/antv/PieChart.vue'
import RoseChart from '@/components/dashboard/cpt/antv/RoseChart.vue'

import TextCpt from '@/components/dashboard/cpt/TextCpt.vue'

import TextConfig from '@/components/dashboard/rightBar/config/TextConfig.vue'
import LineConfig from '@/components/dashboard/rightBar/config/antv/LineConfig.vue'
import AreaConfig from '@/components/dashboard/rightBar/config/antv/AreaConfig.vue'
import ColumnConfig from '@/components/dashboard/rightBar/config/antv/ColumnConfig.vue'
import WaterFallConfig from '@/components/dashboard/rightBar/config/antv/WaterFallConfig.vue'
import PieConfig from '@/components/dashboard/rightBar/config/antv/PieConfig.vue'

import TextData from '@/components/dashboard/rightBar/data/TextData.vue'
import CoordinateData from '@/components/dashboard/rightBar/data/antv/CoordinateData.vue'
import MappingData from '@/components/dashboard/rightBar/data/antv/MappingData.vue'

const cptList = [
  LineChart,
  MultipleLineChart,
  AreaChart,
  ColumnChart,
  GroupedColumn,
  StackedColumn,
  WaterFallChart,
  BarChart,
  PieChart,
  RoseChart,
  TextCpt
]

const configList = [
  LineConfig,
  AreaConfig,
  ColumnConfig,
  WaterFallConfig,
  PieConfig,
  TextConfig
]

const dataList = [CoordinateData, MappingData, TextData]

export function registerCpt(): void {
  cptList.forEach((i: any) => {
    app.component(i.__name, i)
  })

  configList.forEach((i: any) => {
    app.component(i.__name, i)
  })

  dataList.forEach((i: any) => {
    app.component(i.__name, i)
  })
}
