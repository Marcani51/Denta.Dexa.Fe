// src/api/absenceApi.ts
import { createDiscreteApi } from 'naive-ui'
import axios from 'axios'
import type { Absence, Root } from './type'

const store = useAuthStore()
const { message } = createDiscreteApi(['message'])

const url = {
  saveAbsence: () => `http://103.189.235.175:5410/v1/absence`,
  getAllAbsence: () => `http://103.189.235.175:5410/v1/absence`,
  getUserAbsence:(id:any)=>`http://103.189.235.175:5410/v1/absence/${id}`
}

export type UserAbsenceResponse = Root<Absence>
const metaAxiosInstance = axios.create()

export async function saveAbsenceApi(formData: FormData) {
  try {
    const token = store.token
    const response = await metaAxiosInstance.post(url.saveAbsence(), formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    message.success('Absensi berhasil disimpan')
    return response.data
  } catch (error: any) {
    message.error(error?.message ?? 'Gagal menyimpan absensi')
    throw error
  }
}
export const useAbsentData= (config?: Config<UserAbsenceResponse>) => {
  return useHttp<UserAbsenceResponse>(
    computed(() => url.getAllAbsence()),
    config
  )
}

export async function getAbsenceApi() {
  try {
    const token = store.token
    const response = await metaAxiosInstance.get(url.getAllAbsence(), {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error: any) {
    message.error(error?.message ?? 'Gagal memuat absensi')
    throw error
  }
}

export async function getUserAbsence(param: any) {
  const token = store.token

  const response = await metaAxiosInstance.get(url.getUserAbsence(param),{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data as UserAbsenceResponse
}

