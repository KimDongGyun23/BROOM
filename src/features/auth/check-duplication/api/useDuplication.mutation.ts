import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { instanceWithoutAuth } from '@/app/api/instanceWithoutAuth'
import type { ValidateIdRequest, ValidateNicknameRequest } from '@/entities/auth/model/auth.type'

export const useIdDuplicationCheckMutation = () =>
  useMutation<string, AxiosError<string>, ValidateIdRequest>({
    mutationFn: ({ body }) => instanceWithoutAuth.post(`/validate-id`, body),
  })

export const useNicknameDuplicationCheckMutation = () =>
  useMutation<string, AxiosError<string>, ValidateNicknameRequest>({
    mutationFn: ({ body }) => instanceWithoutAuth.post(`/validate-nickname`, body),
  })
