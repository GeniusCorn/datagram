import { app } from '@/main'

import BasicLine from '@/components/dashboard/cpt/antv/BasicLine.vue'
import CptText from '@/components/dashboard/cpt/CptText.vue'

import TextConfig from '@/components/dashboard/rightBar/config/TextConfig.vue'

import TextData from '@/components/dashboard/rightBar/data/TextData.vue'

const list = [BasicLine, CptText, TextConfig, TextData]

export function registerCpt(): void {
  list.forEach((i) => {
    app.component(i.__name, i)
  })
}
