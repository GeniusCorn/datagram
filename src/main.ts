import 'uno.css'

import App from './App.vue'
import { createApp } from 'vue'
import router from '@/router/'
import { createPinia } from 'pinia'
import { registerCpt } from '@/register'

export const app = createApp(App)
const pinia = createPinia()

app.use(router).use(pinia).mount('#app')
registerCpt()
