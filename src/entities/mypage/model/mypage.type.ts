import type { MilitaryBranchCode } from '@/shared/lib/constants'

type UserInformation = {
  nickname: string
  militaryBranch: MilitaryBranchCode
}

type YearOfArmy = {
  reserveYear: number
  dischargeYear: number
}

export type UpdatePasswordForm = {
  password: string
  newPassword: string
  confirm: string
}

export type AccountDetails = UserInformation & Pick<YearOfArmy, 'dischargeYear'>

export type MypageProfileResponse = UserInformation & Pick<YearOfArmy, 'reserveYear'>

export type AccountDetailsResponse = AccountDetails
export type UpdateAccountDetailsRequest = {
  body: AccountDetails
}

export type UpdatePasswordRequest = {
  body: Omit<UpdatePasswordForm, 'confirm'>
}
