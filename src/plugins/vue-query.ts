import { VueQueryPlugin } from "@tanstack/vue-query"
import { definePlugin } from "@/corepackage/src"

export default definePlugin((app) => {
    app.use(VueQueryPlugin)
})
