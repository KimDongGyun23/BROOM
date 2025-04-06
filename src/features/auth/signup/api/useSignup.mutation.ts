import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { instanceWithoutAuth } from '@/app/api/instanceWithoutAuth'
import type { SignupRequest } from '@/entities/auth/model/auth.type'

export const useSignupMutation = () => {
  return useMutation<string, AxiosError<string>, SignupRequest>({
    mutationFn: ({ body }) => instanceWithoutAuth.post('/signup', body),
  })
}
