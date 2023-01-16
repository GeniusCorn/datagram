import { app } from '@/main'

import LineChart from '@/components/dashboard/cpt/antv/LineChart.vue'
import MultipleLineChart from '@/components/dashboard/cpt/antv/MultipleLineChart.vue'
import AreaChart from '@/components/dashboard/cpt/antv/AreaChart.vue'
import ColumnChart from '@/components/dashboard/cpt/antv/ColumnChart.vue'
import GroupedColumnChart from '@/components/dashboard/cpt/antv/GroupedColumnChart.vue'
import StackedColumnChart from '@/components/dashboard/cpt/antv/StackedColumnChart.vue'
import WaterFallChart from '@/components/dashboard/cpt/antv/WaterFallChart.vue'
import BarChart from '@/components/dashboard/cpt/antv/BarChart.vue'
import PieChart from '@/components/dashboard/cpt/antv/PieChart.vue'
import RoseChart from '@/components/dashboard/cpt/antv/RoseChart.vue'
import RadarChart from '@/components/dashboard/cpt/antv/RadarChart.vue'
import ScatterChart from '@/components/dashboard/cpt/antv/ScatterChart.vue'
import FunnelChart from '@/components/dashboard/cpt/antv/FunnelChart.vue'

import TextCpt from '@/components/dashboard/cpt/TextCpt.vue'

import TextConfig from '@/components/dashboard/rightBar/config/TextConfig.vue'
import LineConfig from '@/components/dashboard/rightBar/config/antv/LineConfig.vue'
import AreaConfig from '@/components/dashboard/rightBar/config/antv/AreaConfig.vue'
import ColumnConfig from '@/components/dashboard/rightBar/config/antv/ColumnConfig.vue'
import WaterFallConfig from '@/components/dashboard/rightBar/config/antv/WaterFallConfig.vue'
import PieConfig from '@/components/dashboard/rightBar/config/antv/PieConfig.vue'
import RadarConfig from '@/components/dashboard/rightBar/config/antv/RadarConfig.vue'
import ScatterConfig from '@/components/dashboard/rightBar/config/antv/ScatterConfig.vue'
import FunnelConfig from '@/components/dashboard/rightBar/config/antv/FunnelConfig.vue'

import TextData from '@/components/dashboard/rightBar/data/TextData.vue'
import CoordinateData from '@/components/dashboard/rightBar/data/antv/CoordinateData.vue'
import MappingData from '@/components/dashboard/rightBar/data/antv/MappingData.vue'

const cptList = [
  LineChart,
  MultipleLineChart,
  AreaChart,
  ColumnChart,
  GroupedColumnChart,
  StackedColumnChart,
  WaterFallChart,
  BarChart,
  PieChart,
  RoseChart,
  RadarChart,
  ScatterChart,
  FunnelChart,
  TextCpt
]

const configList = [
  LineConfig,
  AreaConfig,
  ColumnConfig,
  WaterFallConfig,
  PieConfig,
  RadarConfig,
  ScatterConfig,
  FunnelConfig,
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
