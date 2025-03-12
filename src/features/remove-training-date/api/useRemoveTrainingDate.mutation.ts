import { useMutation } from '@tanstack/react-query'

import { instance } from '@/app/api'
import type { RemoveTrainingDateRequest } from '@/entities/admin/model/admin.type'

export const useRemoveTrainingDateMutation = () => {
  return useMutation({
    mutationFn: ({ urls }: RemoveTrainingDateRequest) =>
      instance.delete<string>(`/admin/date-tag/${urls.id}`),
  })
}
