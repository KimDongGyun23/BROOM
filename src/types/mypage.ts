export type MypageUser = {
  nickname: string
  dischargeYear: number
  militaryChaplain: string
}

export type PasswordUpdateForm = {
  password: string
  newPassword: string
  confirm: string
}

export type UserProfile = Pick<MypageUser, 'nickname' | 'dischargeYear'>

export type UpdateAccountRequest = {
  body: MypageUser
}

export type UpdatePasswordRequest = {
  body: Omit<PasswordUpdateForm, 'confirm'>
}
