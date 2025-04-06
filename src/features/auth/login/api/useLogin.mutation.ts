import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { instanceWithoutAuth } from '@/app/api/instanceWithoutAuth'
import type { LoginRequest, LoginResponse } from '@/entities/auth/model/auth.type'

export const useLoginMutation = () =>
  useMutation<LoginResponse, AxiosError<string>, LoginRequest>({
    mutationFn: ({ body }) =>
      instanceWithoutAuth.post('/login', body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
  })
