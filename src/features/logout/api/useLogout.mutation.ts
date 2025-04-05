import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { instance } from '@/app/api'

export const useLogoutMutation = () =>
  useMutation<string, AxiosError<string>>({
    mutationFn: () => instance.post('/logout', null),
  })
