import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { instance } from '@/app/api'
import type { UpdatePasswordRequest } from '@/entities/mypage/model/mypage.type'

export const useUpdatePasswordMutation = () =>
  useMutation<string, AxiosError<string>, UpdatePasswordRequest>({
    mutationFn: ({ body }) => instance.post(`/mypage/password`, body),
  })
