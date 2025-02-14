import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

import type {
  AccountInfoResponse,
  ProfileResponse,
  UpdateAccountRequest,
  UpdatePasswordRequest,
} from '@/types/mypage'

import { instance } from '.'

const ENDPOINTS = {
  fetchMypage: `/mypage`,
  fetchAccountInfo: `/mypage/info`,
  ACCOUNT: `/mypage/info`,
  updatePassword: `/mypage/password`,
  logout: `/logout`,
  deleteUser: `/exit`,
} as const

const queryKeys = {
  all: ['mypage'] as const,
  account: () => [...queryKeys.all, 'account'] as const,
  myCarpoolPost: () => [...queryKeys.all, 'carpool'] as const,
}

export const useUserProfile = () => {
  return useQuery<ProfileResponse>({
    queryKey: queryKeys.all,
    queryFn: async () => await instance.get(ENDPOINTS.fetchMypage),
  })
}

export const useFetchAccountInfo = () => {
  return useQuery<AccountInfoResponse>({
    queryKey: queryKeys.account(),
    queryFn: async () => await instance.get(ENDPOINTS.fetchAccountInfo),
  })
}

export const useUpdateUserAccount = () => {
  const queryClient = useQueryClient()

  return useMutation<AxiosResponse<string>, AxiosError, UpdateAccountRequest>({
    mutationFn: async ({ body }) => await instance.put(ENDPOINTS.ACCOUNT, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.all }),
  })
}

export const useUpdatePassword = () => {
  return useMutation<AxiosResponse<string>, AxiosError, UpdatePasswordRequest>({
    mutationFn: async ({ body }) => await instance.post(ENDPOINTS.updatePassword, body),
  })
}

export const useLogout = () => {
  return useMutation<AxiosResponse<string>, AxiosError>({
    mutationFn: async () => await instance.post(ENDPOINTS.logout, null),
  })
}

export const useUserDeletion = () => {
  return useMutation<AxiosResponse<string>, AxiosError>({
    mutationFn: async () => instance.delete(ENDPOINTS.deleteUser),
  })
}
