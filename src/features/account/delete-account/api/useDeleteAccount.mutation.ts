import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { instance } from '@/app/api'

export const useDeleteAccountMutation = () =>
  useMutation<string, AxiosError<string>>({
    mutationFn: () => instance.delete('/exit'),
  })
