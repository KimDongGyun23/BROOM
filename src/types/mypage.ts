type UserType = {
  nickname: string
  dischargeYear: number
  militaryChaplain: string
}

type PasswordType = {
  password: string
  newPassword: string
}

type CarpoolBoardType = {
  carpoolBoardId: number
  title: string
  createdAt: string
  trainingDate: string
  departPlace: string
  departTime: string
  full: boolean
}

type TeammateBoardType = {
  teamBoardId: number
  title: string
  createdAt: string
  trainingDate: string
  meetingPlace: string
  meetingTime: string
  full: boolean
}

export type UserAccountFormType = UserType
export type NewPasswordFormType = PasswordType & { confirm: string }

export type MypageInfoResponse = Pick<UserType, 'nickname' | 'dischargeYear'>

export type MypageAccountResponse = UserType

export type UpdateAccountRequest = {
  body: UserType
}

export type UpdatePasswordRequest = {
  body: PasswordType
}

export type MypageCarpoolResponse = {
  result: CarpoolBoardType[]
}

export type MypageTeammateResponse = {
  result: TeammateBoardType[]
}
