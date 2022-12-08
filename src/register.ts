import { app } from '@/main'

import BasicLine from '@/components/dashboard/cpt/antv/BasicLine.vue'
import CptText from '@/components/dashboard/cpt/CptText.vue'

import TextConfig from '@/components/dashboard/rightBar/config/TextConfig.vue'
import AntVBasicLineConfig from '@/components/dashboard/rightBar/config/antv/BasicLineConfig.vue'

import TextData from '@/components/dashboard/rightBar/data/TextData.vue'

const list = [BasicLine, CptText, TextConfig, AntVBasicLineConfig, TextData]

export function registerCpt(): void {
  list.forEach((i: any) => {
    app.component(i.__name, i)
  })
}
