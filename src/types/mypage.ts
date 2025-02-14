import type { MilitaryBranchCode } from '@/utils/constants'

type User = {
  nickname: string
  reserveYear: number
  dischargeYear: number
  militaryBranch: MilitaryBranchCode
}

type Profile = Omit<User, 'dischargeYear'>
export type UserAccount = Omit<User, 'reserveYear'>

export type PasswordUpdateForm = {
  password: string
  newPassword: string
  confirm: string
}

export type ProfileResponse = Profile

export type AccountInfoResponse = UserAccount
export type UpdateAccountRequest = {
  body: UserAccount
}

export type UpdatePasswordRequest = {
  body: Omit<PasswordUpdateForm, 'confirm'>
}
