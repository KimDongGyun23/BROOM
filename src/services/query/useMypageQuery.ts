import { useMutation, useQuery } from '@tanstack/react-query'

import { api } from '@/queries'
import type { MypageInfoResponse } from '@/types'

const fetchInfo = async () => {
  return await api.get<MypageInfoResponse>(`/mypage`)
}

const deleteUser = async () => {
  return await api.delete(`/exit`)
}

const queryKeys = {
  all: ['mypage'] as const,
  account: () => [...queryKeys.all, 'account'] as const,
  myCarpoolPost: () => [...queryKeys.all, 'carpool'] as const,
  myTeammatePost: () => [...queryKeys.all, 'teammate'] as const,
}

export const useUserProfile = () => {
  return useQuery({
    queryKey: queryKeys.all,
    queryFn: fetchInfo,
  })
}

export const useUserDeletion = () => {
  return useMutation({
    mutationFn: deleteUser,
  })
}
