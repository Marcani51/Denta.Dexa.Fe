import './style.css'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'

// @ts-ignore
import App from './App.vue'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const app = createApp(App)

const plugins = import.meta.glob('./plugins/*.ts', {
  eager: true
})

Object.values(plugins).forEach((module: any) => {
  app.use(module.default)
})

app.mount('#app')
