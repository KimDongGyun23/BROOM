import { useMutation } from '@tanstack/react-query'

import { instance } from '@/app/api'

export const useToggleBusApplicationMutation = () =>
  useMutation({
    mutationFn: () => instance.patch<string>(`/admin/bus/activate`),
  })
