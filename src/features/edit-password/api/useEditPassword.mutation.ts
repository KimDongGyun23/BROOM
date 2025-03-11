import { useMutation } from '@tanstack/react-query'

import { instance } from '@/app/api'
import type { PasswordUpdateRequest } from '@/entities/mypage/model/mypage.type'

export const useEditPasswordMutation = () =>
  useMutation({
    mutationFn: ({ body }: PasswordUpdateRequest) =>
      instance.post<string>(`/mypage/password`, body),
  })
