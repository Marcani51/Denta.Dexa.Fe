import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { definePlugin } from "@/corepackage/src"

export default definePlugin((app) => {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  //@ts-ignore
  app.use(pinia)
})
