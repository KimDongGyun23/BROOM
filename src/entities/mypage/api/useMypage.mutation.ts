import { useMutation, useQueryClient } from '@tanstack/react-query'

import { instance } from '@/app/api'
import type {
  PasswordUpdateRequest,
  UpdateAccountInformationRequest,
} from '@/entities/mypage/model/mypage.type'

import { queryKeys } from './useMypage.query'

const ENDPOINTS = {
  updateAccount: `/mypage/info`,
  updatePassword: `/mypage/password`,
  deleteId: `/exit`,
} as const

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

export const useDeleteId = () =>
  useMutation({
    mutationFn: () => instance.delete<string>(ENDPOINTS.deleteId),
  })
