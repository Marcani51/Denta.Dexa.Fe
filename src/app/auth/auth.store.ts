import type {  User } from '@/composables'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth/dexa', {
  state: () => ({
    user: undefined as User | undefined,
    token: undefined as string | undefined
  }),
  persist: {
    storage: localStorage
  }
})
