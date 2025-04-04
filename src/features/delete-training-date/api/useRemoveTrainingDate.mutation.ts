import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { instance } from '@/app/api'
import type { RemoveTrainingDateRequest } from '@/entities/admin/model/admin.type'

export const useRemoveTrainingDateMutation = () => {
  return useMutation<string, AxiosError<string>, RemoveTrainingDateRequest>({
    mutationFn: ({ urls }) => instance.delete(`/admin/date-tag/${urls.id}`),
  })
}
