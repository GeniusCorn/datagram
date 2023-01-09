import { app } from '@/main'

import CptText from '@/components/dashboard/cpt/CptText.vue'
import BasicLine from '@/components/dashboard/cpt/antv/BasicLine.vue'
import BasicArea from '@/components/dashboard/cpt/antv/BasicArea.vue'
import BasicPie from '@/components/dashboard/cpt/antv/BasicPie.vue'
import BasicColumn from '@/components/dashboard/cpt/antv/BasicColumn.vue'
import BasicBar from '@/components/dashboard/cpt/antv/BasicBar.vue'

import TextConfig from '@/components/dashboard/rightBar/config/TextConfig.vue'
import BasicLineConfig from '@/components/dashboard/rightBar/config/antv/BasicLineConfig.vue'
import BasicAreaConfig from '@/components/dashboard/rightBar/config/antv/BasicAreaConfig.vue'
import BasicPieConfig from '@/components/dashboard/rightBar/config/antv/BasicPieConfig.vue'
import BasicColumnConfig from '@/components/dashboard/rightBar/config/antv/BasicColumnConfig.vue'
import BasicBarConfig from '@/components/dashboard/rightBar/config/antv/BasicBarConfig.vue'

import TextData from '@/components/dashboard/rightBar/data/TextData.vue'
import CoordinateData from '@/components/dashboard/rightBar/data/antv/CoordinateData.vue'
import MappingData from '@/components/dashboard/rightBar/data/antv/MappingData.vue'

const cptList = [CptText, BasicLine, BasicArea, BasicPie, BasicColumn, BasicBar]

const configList = [
  TextConfig,
  BasicLineConfig,
  BasicAreaConfig,
  BasicPieConfig,
  BasicColumnConfig,
  BasicBarConfig,
  TextData,
  CoordinateData,
  MappingData
]

export function registerCpt(): void {
  cptList.forEach((i: any) => {
    app.component(i.__name, i)
  })

  configList.forEach((i: any) => {
    app.component(i.__name, i)
  })
}
