import { useSuspenseQuery } from '@tanstack/react-query'

import { instance } from '@/app/api'
import type {
  AccountInformationResponse,
  MypageProfileResponse,
} from '@/entities/mypage/model/mypage.type'

const ENDPOINTS = {
  fetchMypage: `/mypage`,
  fetchAccountInformation: `/mypage/info`,
} as const

export const mypageQueryKeys = {
  all: ['mypage'] as const,
  account: () => [...mypageQueryKeys.all, 'account'] as const,
}

export const useUserProfile = () =>
  useSuspenseQuery({
    queryKey: mypageQueryKeys.all,
    queryFn: () => instance.get<MypageProfileResponse>(ENDPOINTS.fetchMypage),
  })

export const useFetchAccountInformation = () =>
  useSuspenseQuery({
    queryKey: mypageQueryKeys.account(),
    queryFn: () => instance.get<AccountInformationResponse>(ENDPOINTS.fetchAccountInformation),
  })
