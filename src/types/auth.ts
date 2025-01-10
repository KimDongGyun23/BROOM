import type { MilitaryBranchCode } from '@/utils/constants'

type User = {
  userId: string
  password: string
  nickname: string
  dischargeYear: number
  militaryChaplain: MilitaryBranchCode
}

export type LoginCredentials = Pick<User, 'userId' | 'password'>
export type SignupData = User & { confirm: string }
export type SavedUserData = Pick<User, 'nickname' | 'militaryChaplain'>

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
