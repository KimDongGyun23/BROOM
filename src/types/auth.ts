import type { MilitaryBranchCode } from '@/utils/constants'

type User = {
  userId: string
  password: string
  nickname: string
  dischargeYear: number
  militaryChaplain: MilitaryBranchCode
}

type Confirm = {
  confirm: string
}

export type Login = Pick<User, 'userId' | 'password'>
export type Signup = User & Confirm
export type SavedUserData = Pick<User, 'nickname' | 'militaryChaplain'>

export type LoginRequest = {
  body: Login
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
