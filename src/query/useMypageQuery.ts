import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  AccountInformationResponse,
  MypageProfileResponse,
  PasswordUpdateRequest,
  UpdateAccountInformationRequest,
} from '@/types/mypage'

import { instance } from '.'

const ENDPOINTS = {
  fetchMypage: `/mypage`,
  fetchAccountInformation: `/mypage/info`,
  updateAccount: `/mypage/info`,
  updatePassword: `/mypage/password`,
  logout: `/logout`,
  deleteId: `/exit`,
} as const

const queryKeys = {
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

export const useUpdateAccountInformation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ body }: UpdateAccountInformationRequest) =>
      instance.put<string>(ENDPOINTS.updateAccount, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.all }),
  })
}

export const useUpdatePassword = () =>
  useMutation({
    mutationFn: ({ body }: PasswordUpdateRequest) =>
      instance.post<string>(ENDPOINTS.updatePassword, body),
  })

export const useLogout = () =>
  useMutation({
    mutationFn: () => instance.post<string>(ENDPOINTS.logout, null),
  })

export const useDeleteId = () =>
  useMutation({
    mutationFn: () => instance.delete<string>(ENDPOINTS.deleteId),
  })
