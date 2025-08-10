export type Root<Datum = unknown> = {
    isSuccessful: boolean
    message: string
    type: string
    errorCode: number
    payload?: Datum
    data?:Datum
  }

  export type Response<Datum = unknown> = {
    status: string
    code: number
    message: string
    data?: Datum
    total: number,
    token:string
  }

  export type Detail={
    name:string
  }
  export type User={
    username:string
    password:string
    email:string
    roleId:string
    detailId:string
    detail:Detail
    createdDate:Date
    updateDate: Date
    createdBy:string
    updateBy:string
    isActive:boolean
  }
  export type LoginPayload = {
    username: string
    password: string
  }