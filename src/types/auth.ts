import type { AxiosResponse } from 'axios'

import type { MilitaryBranchCode } from '@/utils/constants'

type User = {
  userId: string
  password: string
  nickname: string
  dischargeYear: number
  militaryBranch: MilitaryBranchCode
}

export type LoginCredentials = Pick<User, 'userId' | 'password'>
export type SignupData = User & { confirm: string }

export type LoginRequest = {
  body: LoginCredentials
}

export type SignupRequest = {
  body: User
}

export type ValidateIdRequest = {
  body: Pick<User, 'userId'>
}

export type ValidateNicknameRequest = {
  body: Pick<User, 'nickname'>
}

export type LoginResponse = AxiosResponse<Pick<User, 'nickname' | 'militaryBranch'>> & {
  headers: {
    authorization?: string
  }
}
