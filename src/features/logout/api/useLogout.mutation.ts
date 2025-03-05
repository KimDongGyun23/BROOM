import { useMutation } from '@tanstack/react-query'

import { instance } from '@/app/api'

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: () => instance.post<string>('/logout', null),
  })
