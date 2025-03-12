import { useMutation } from '@tanstack/react-query'

import { instance } from '@/app/api'
import type { UpdatePasswordRequest } from '@/entities/mypage/model/mypage.type'

export const useUpdatePasswordMutation = () =>
  useMutation({
    mutationFn: ({ body }: UpdatePasswordRequest) =>
      instance.post<string>(`/mypage/password`, body),
  })
