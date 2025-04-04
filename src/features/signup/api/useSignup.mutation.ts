import { useMutation } from '@tanstack/react-query'

import { instanceWithoutAuth } from '@/app/api/instanceWithoutAuth'
import type { SignupRequest } from '@/entities/auth/model/auth.type'

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: ({ body }: SignupRequest) => instanceWithoutAuth.post<string>('/signup', body),
  })
}
