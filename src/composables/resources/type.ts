export type Root<Datum = unknown> = {
  isSuccessful: boolean
  code: number
  message: string
  type: string
  errorCode: number
  payload?: Datum
  data?: Datum
}

export type Response<Datum = unknown> = {
  status: string
  code: number
  message: string
  data?: Datum
  total: number
  token: string
}

export type Detail = {
  name: string
}
export type User = {
  id: string
  username: string
  password: string
  email: string
  roleId: string
  detailId: string
  detail: Detail
  createdDate: Date
  updateDate: Date
  createdBy: string
  updateBy: string
  isActive: boolean
}
export type LoginPayload = {
  username: string
  password: string
}

export type Role = {
  roleName: string
  isActive: boolean
  createdBy: string
  updateBy: string
  createdDate: Date
  updateDate: Date
  access: Access
}
export type Access = {
  view: boolean
  edit: boolean
  absent: boolean
}

export type DetailAbsence = {
  id: string
  userId: string
  timestamp: Date
  photoUrl: string
  createdDate: Date
  updateDate: Date
}

export type Absence = {
  absence: DetailAbsence[]
  user:User
}

export type FieldOption = {
  label: string
  value: string | number | boolean
}

export type FieldConfig = {
  key: string
  label: string
  type: 'text' | 'select' | 'date' | 'checkbox'
  required?: boolean
  options?: FieldOption[]
}
