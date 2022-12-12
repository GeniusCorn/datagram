import { app } from '@/main'

import BasicLine from '@/components/dashboard/cpt/antv/BasicLine.vue'
import BasicPie from '@/components/dashboard/cpt/antv/BasicPie.vue'
import BasicColumn from '@/components/dashboard/cpt/antv/BasicColumn.vue'
import CptText from '@/components/dashboard/cpt/CptText.vue'

import TextConfig from '@/components/dashboard/rightBar/config/TextConfig.vue'
import BasicLineConfig from '@/components/dashboard/rightBar/config/antv/BasicLineConfig.vue'
import BasicPieConfig from '@/components/dashboard/rightBar/config/antv/BasicPieConfig.vue'
// import BasicColumnConfig from '@/components/dashboard/rightBar/config/antv/BasicColumnConfig.vue'

import TextData from '@/components/dashboard/rightBar/data/TextData.vue'
import CoordinateData from '@/components/dashboard/rightBar/data/antv/CoordinateData.vue'
import MappingData from '@/components/dashboard/rightBar/data/antv/MappingData.vue'

const list = [
  BasicLine,
  BasicPie,
  BasicColumn,
  CptText,
  TextConfig,
  BasicLineConfig,
  BasicPieConfig,
  // BasicColumnConfig,
  TextData,
  CoordinateData,
  MappingData
]

export function registerCpt(): void {
  list.forEach((i: any) => {
    app.component(i.__name, i)
  })
}
