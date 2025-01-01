import { useMutation, useQuery } from '@tanstack/react-query'

import { mypageAccount, mypageLogout } from './mypageApi'

const queryKeys = {
  all: ['mypage'] as const,
  account: () => [...queryKeys.all, 'account'] as const,
  myCarpoolPost: () => [...queryKeys.all, 'carpool'] as const,
  myTeammatePost: () => [...queryKeys.all, 'teammate'] as const,
}

export const useMypageAccount = () => {
  return useQuery({
    queryKey: queryKeys.account(),
    queryFn: mypageAccount,
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: mypageLogout,
  })
}
