import { useSuspenseQuery } from '@tanstack/react-query'

import { instance } from '@/app/api'
import type {
  AccountDetailsResponse,
  MypageProfileResponse,
} from '@/entities/mypage/model/mypage.type'

export const mypageQueryKeys = {
  all: ['mypage'] as const,
  account: () => [...mypageQueryKeys.all, 'account'] as const,
}

export const useFetchUserProfile = () =>
  useSuspenseQuery({
    queryKey: mypageQueryKeys.all,
    queryFn: () => instance.get<MypageProfileResponse>('/mypage'),
  })

export const useFetchAccountDetails = () =>
  useSuspenseQuery({
    queryKey: mypageQueryKeys.account(),
    queryFn: () => instance.get<AccountDetailsResponse>('/mypage/info'),
  })
