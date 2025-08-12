import { createDiscreteApi } from 'naive-ui'
import type { LoginPayload, Response, Root } from './type'
import type { User, Role} from './type'
import axios, { type AxiosResponse } from 'axios'
const url = {
  login: () => `http://localhost:5420/v1/login`,
  getAllUser: () => `http://localhost:5430/v1/user`,
  updateUser: (id: any) => `http://localhost:5430/v1/user/${id}`,
  updateRole:(id:any)=>`http://localhost:5430/v1/role/${id}`,
  saveUser:()=>`http://localhost:5430/v1/user`,
  saveRole:()=>`http://localhost:5430/v1/role`,
  getAllrole: () => `http://localhost:5430/v1/role`,
  getRoleById:(id:any)=>`http://localhost:5430/v1/role/${id}`
}
const store = useAuthStore()
export const logout = () => {
  store.user = undefined
  store.token = undefined
}

export type LoginResponse = Response<User>
export type UserDataResponse = Root<User>
export type RoleDataResponse=Root<Role>

const { message } = createDiscreteApi(['message'])

export const useLogin = () => {
  return useHttpMutation<Omit<LoginPayload, 'application_id'>, LoginResponse, Response>(
    url.login(),
    {
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
    }
  )
}

export const useUserData = (config?: Config<UserDataResponse>) => {
  return useHttp<UserDataResponse>(
    computed(() => url.getAllUser()),
    config
  )
}

export const useRoleData= (config?: Config<RoleDataResponse>) => {
  return useHttp<RoleDataResponse>(
    computed(() => url.getAllrole()),
    config
  )
}

const metaAxiosInstance = axios.create()

export async function updateUserApi(data: any, param: any) {
  const token = store.token

  const response = await metaAxiosInstance.put(url.updateUser(param), data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data as UserDataResponse
}

export async function updateRoleApi(data: any, param: any) {
  const token = store.token

  const response = await metaAxiosInstance.put(url.updateRole(param), data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data as RoleDataResponse
}



export async function saveUserApi(data: any) {
  const token = store.token

  const response = await metaAxiosInstance.post(url.saveUser(), data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data as UserDataResponse
}

export async function saveRoleApi(data: any) {
  const token = store.token

  const response = await metaAxiosInstance.post(url.saveRole(), data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data as RoleDataResponse
}

export async function getRoleByIdApi(param: any) {
  const token = store.token

  const response = await metaAxiosInstance.get(url.getRoleById(param), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data as UserDataResponse
}
