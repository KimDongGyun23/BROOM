import type { MilitaryBranchCode } from '@/utils/constants'

export type AuthType = {
  userId: string
  password: string
  nickname: string
  dischargeYear: number
  militaryChaplain: MilitaryBranchCode
}

export type LoginFormType = Pick<AuthType, 'userId' | 'password'>
export type SignupFormType = AuthType & { confirm: string }

export type LoginRequest = {
  body: Pick<AuthType, 'userId' | 'password'>
}
export type LoginResponse = Pick<AuthType, 'nickname' | 'militaryChaplain'>

export type SignupRequest = {
  body: AuthType
}

export type ValidateIdRequest = {
  body: Pick<AuthType, 'userId'>
}
export type ValidateIdResponse = string

export type ValidateNicknameRequest = {
  body: Pick<AuthType, 'nickname'>
}
export type ValidateNicknameResponse = string
