import { useMutation } from '@tanstack/react-query'

import { instance } from '@/app/api'
import type { PasswordUpdateRequest } from '@/entities/mypage/model/mypage.type'

const ENDPOINTS = {
  updatePassword: `/mypage/password`,
} as const

export const useUpdatePassword = () =>
  useMutation({
    mutationFn: ({ body }: PasswordUpdateRequest) =>
      instance.post<string>(ENDPOINTS.updatePassword, body),
  })
