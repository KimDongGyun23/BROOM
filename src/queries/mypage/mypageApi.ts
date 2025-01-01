import type { MypageAccountResponse, MypageCarpoolResponse, MypageTeammateResponse } from '@/types'

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

export const mypageLogout = async () => {
  return await api.post(`/logout`, undefined)
}
