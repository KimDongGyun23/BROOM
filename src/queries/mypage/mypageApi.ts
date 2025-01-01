import type { MypageAccountResponse } from '@/types'

import { api } from '..'

export const mypageAccount = async () => {
  return await api.get<MypageAccountResponse>(`/mypage/info`)
}

export const mypageLogout = async () => {
  return await api.post(`/logout`, undefined)
}
