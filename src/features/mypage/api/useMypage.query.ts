import { useQuery } from '@tanstack/react-query'

import { instance } from '@/app/api'
import type {
  AccountInformationResponse,
  MypageProfileResponse,
} from '@/features/mypage/model/mypage.type'

const ENDPOINTS = {
  fetchMypage: `/mypage`,
  fetchAccountInformation: `/mypage/info`,
} as const

export const queryKeys = {
  all: ['mypage'] as const,
  account: () => [...queryKeys.all, 'account'] as const,
}

export const useUserProfile = () =>
  useQuery({
    queryKey: queryKeys.all,
    queryFn: () => instance.get<MypageProfileResponse>(ENDPOINTS.fetchMypage),
  })

export const useFetchAccountInformation = () =>
  useQuery({
    queryKey: queryKeys.account(),
    queryFn: () => instance.get<AccountInformationResponse>(ENDPOINTS.fetchAccountInformation),
  })
