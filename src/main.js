import './assets/main.css'

import { createApp } from 'vue'
import router from './router/index.js'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(autoAnimatePlugin)
app.use(router)
app.use(pinia)
app.mount('#app')
