import type {
  MypageAccountResponse,
  MypageCarpoolResponse,
  MypagePasswordRequest,
  MypageTeammateResponse,
} from '@/types'

import { api } from '..'

export const mypageAccount = async () => {
  return await api.get<MypageAccountResponse>(`/mypage/info`)
}

export const mypageCarpool = async () => {
  return await api.get<MypageCarpoolResponse>(`/mypage/carpool`)
}

export const mypageTeammate = async () => {
  return await api.get<MypageTeammateResponse>(`/mypage/team`)
}

export const mypagePassword = async ({ body }: MypagePasswordRequest) => {
  return await api.post<string>(`/mypage/password`, body)
}

export const mypageLogout = async () => {
  return await api.post(`/logout`, undefined)
}
