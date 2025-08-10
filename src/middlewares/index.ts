import { defineMiddleware } from '@/corepackage/src'

export default defineMiddleware((to, from, next) => {
    const auth = useAuthStore()
    const isLoggedIn = auth.user
    //const isLoggedIn=false;

  // auth middleware
  if (to.path == '/auth/login' && isLoggedIn) return next('/dashboard')

  if (to.path != '/auth/login' && !isLoggedIn) {
   // logout()
    return next('/auth/login')
  }
  console.log('exampleMiddleware', from, to)
  next()
})
