import 'uno.css'

import App from './App.vue'
import { createApp } from 'vue'
import router from '@/router/'
import { createPinia } from 'pinia'

import CptText from '@/components/dashboard/cpt/CptText.vue'
import TextConfig from '@/components/dashboard/rightBar/config/TextConfig.vue'
import TextData from '@/components/dashboard/rightBar/data/TextData.vue'

const app = createApp(App)
const pinia = createPinia()

app.component('CptText', CptText)
app.component('TextConfig', TextConfig)
app.component('TextData', TextData)

app.use(router).use(pinia).mount('#app')
