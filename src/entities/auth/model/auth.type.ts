import type { MilitaryBranchCode } from '@/shared/lib/constants'

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

export type LoginResponse = Pick<User, 'nickname' | 'militaryBranch'> & {
  role: 'ROLE_ADMIN' | 'ROLE_MEMBER'
  token: string
}
