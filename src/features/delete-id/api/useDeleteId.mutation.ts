import { useMutation } from '@tanstack/react-query'

import { instance } from '@/app/api'

export const useDeleteIdMutation = () =>
  useMutation({
    mutationFn: () => instance.delete<string>('/exit'),
  })
