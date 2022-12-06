import 'uno.css'

import App from './App.vue'
import { createApp } from 'vue'
import router from '@/router/'
import { createPinia } from 'pinia'

import CptText from './components/dashboard/cpt/CptText.vue'

const app = createApp(App)
const pinia = createPinia()
app.component('CptText', CptText)

app.use(router).use(pinia).mount('#app')
