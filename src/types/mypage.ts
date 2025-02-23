import type { MilitaryBranchCode } from '@/shared/lib/constants'

type UserInformation = {
  nickname: string
  militaryBranch: MilitaryBranchCode
}

type YearOfArmy = {
  reserveYear: number
  dischargeYear: number
}

export type PasswordUpdateForm = {
  password: string
  newPassword: string
  confirm: string
}

export type AccountInformation = UserInformation & Pick<YearOfArmy, 'dischargeYear'>

export type MypageProfileResponse = UserInformation & Pick<YearOfArmy, 'reserveYear'>

export type AccountInformationResponse = AccountInformation
export type UpdateAccountInformationRequest = {
  body: AccountInformation
}

export type PasswordUpdateRequest = {
  body: Omit<PasswordUpdateForm, 'confirm'>
}
