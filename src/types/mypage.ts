export type MypageUser = {
  nickname: string
  reserveYear: number
  militaryChaplain: string
}

export type PasswordUpdateForm = {
  password: string
  newPassword: string
  confirm: string
}

export type UserProfile = Pick<MypageUser, 'nickname' | 'reserveYear'>

export type UpdateAccountRequest = {
  body: MypageUser
}

export type UpdatePasswordRequest = {
  body: Omit<PasswordUpdateForm, 'confirm'>
}
