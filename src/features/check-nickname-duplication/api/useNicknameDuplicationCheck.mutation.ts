import { useMutation } from '@tanstack/react-query'

import { instanceWithoutAuth } from '@/app/api'
import type { ValidateNicknameRequest } from '@/entities/auth/model/auth.type'

export const useNicknameDuplicationCheckMutation = () =>
  useMutation({
    mutationFn: ({ body }: ValidateNicknameRequest) =>
      instanceWithoutAuth.post<string>(`/validate-nickname`, body),
  })
