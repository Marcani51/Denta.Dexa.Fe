import { createDiscreteApi } from 'naive-ui'
import type { LoginPayload, Response } from './type'
import type { User } from './type'

const url = {
  login: 'http://localhost:5420/v1/login',
  user: 'http://localhost:3000/v1/user',
  role: 'http://localhost:3000/v1/role'
}

export const logout = () => {
  const store = useAuthStore()
  store.user = undefined
}

export type LoginResponse = Response<User>
const { message } = createDiscreteApi(['message'])

export const useLogin = () => {
  return useHttpMutation<Omit<LoginPayload, 'application_id'>, LoginResponse, Response>(url.login, {
    method: 'POST',
    queryOptions: {
      onMutate(variables) {
        return variables
      },
      onError: (error) => {
        message.error(error?.message ?? 'Error')
      },
      onSuccess: (res) => {
        res.code = 200
        return res
      }
    }
  })
}
