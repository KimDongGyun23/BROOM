import { useMutation } from '@tanstack/react-query'

import { instanceWithoutAuth } from '@/app/api/instanceWithoutAuth'
import type { LoginRequest, LoginResponse } from '@/entities/auth/model/auth.type'

export const useLoginMutation = () =>
  useMutation({
    mutationFn: ({ body }: LoginRequest) =>
      instanceWithoutAuth.post<LoginResponse>('/login', body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
  })
