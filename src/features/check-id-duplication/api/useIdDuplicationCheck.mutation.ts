import { useMutation } from '@tanstack/react-query'

import { instanceWithoutAuth } from '@/app/api/instanceWithoutAuth'
import type { ValidateIdRequest } from '@/entities/auth/model/auth.type'

export const useIdDuplicationCheckMutation = () =>
  useMutation({
    mutationFn: ({ body }: ValidateIdRequest) =>
      instanceWithoutAuth.post<string>(`/validate-id`, body),
  })
