import { app } from '@/main'

import LineChart from '@/components/dashboard/cpt/antv/LineChart.vue'
import MultipleLineChart from '@/components/dashboard/cpt/antv/MultipleLineChart.vue'
import AreaChart from '@/components/dashboard/cpt/antv/AreaChart.vue'
import ColumnChart from '@/components/dashboard/cpt/antv/ColumnChart.vue'
import BarChart from '@/components/dashboard/cpt/antv/BarChart.vue'
import PieChart from '@/components/dashboard/cpt/antv/PieChart.vue'
import TextCpt from '@/components/dashboard/cpt/TextCpt.vue'

import TextConfig from '@/components/dashboard/rightBar/config/TextConfig.vue'
import BasicLineConfig from '@/components/dashboard/rightBar/config/antv/BasicLineConfig.vue'
import BasicAreaConfig from '@/components/dashboard/rightBar/config/antv/BasicAreaConfig.vue'
import BasicPieConfig from '@/components/dashboard/rightBar/config/antv/BasicPieConfig.vue'
import BasicColumnConfig from '@/components/dashboard/rightBar/config/antv/BasicColumnConfig.vue'
import BasicBarConfig from '@/components/dashboard/rightBar/config/antv/BasicBarConfig.vue'

import TextData from '@/components/dashboard/rightBar/data/TextData.vue'
import CoordinateData from '@/components/dashboard/rightBar/data/antv/CoordinateData.vue'
import MappingData from '@/components/dashboard/rightBar/data/antv/MappingData.vue'

const cptList = [
  LineChart,
  MultipleLineChart,
  AreaChart,
  ColumnChart,
  BarChart,
  PieChart,
  TextCpt
]

const configList = [
  BasicLineConfig,
  BasicAreaConfig,
  BasicPieConfig,
  BasicColumnConfig,
  BasicBarConfig,
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
