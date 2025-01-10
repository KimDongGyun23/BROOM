export type MypageUser = {
  nickname: string
  dischargeYear: number
  militaryChaplain: string
}

export type NewPasswordForm = {
  password: string
  newPassword: string
  confirm: string
}

export type UserProfile = Pick<MypageUser, 'nickname' | 'dischargeYear'>

export type UpdateAccountRequest = {
  body: MypageUser
}

export type UpdatePasswordRequest = {
  body: Omit<NewPasswordForm, 'confirm'>
}
