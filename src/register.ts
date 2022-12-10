import { app } from '@/main'

import BasicLine from '@/components/dashboard/cpt/antv/BasicLine.vue'
import BasicPie from '@/components/dashboard/cpt/antv/BasicPie.vue'
import CptText from '@/components/dashboard/cpt/CptText.vue'

import TextConfig from '@/components/dashboard/rightBar/config/TextConfig.vue'
import BasicLineConfig from '@/components/dashboard/rightBar/config/antv/BasicLineConfig.vue'
import BasicPieConfig from '@/components/dashboard/rightBar/config/antv/BasicPieConfig.vue'

import TextData from '@/components/dashboard/rightBar/data/TextData.vue'
import BasicLineData from '@/components/dashboard/rightBar/data/BasicLineData.vue'
import BasicPieData from '@/components/dashboard/rightBar/data/BasicPieData.vue'

const list = [
  BasicLine,
  BasicPie,
  CptText,
  TextConfig,
  BasicLineConfig,
  BasicPieConfig,
  TextData,
  BasicLineData,
  BasicPieData
]

export function registerCpt(): void {
  list.forEach((i: any) => {
    app.component(i.__name, i)
  })
}
