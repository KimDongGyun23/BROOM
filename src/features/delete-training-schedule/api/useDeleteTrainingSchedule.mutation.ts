import { useMutation } from '@tanstack/react-query'

import { instance } from '@/app/api'
import type { DeleteTrainingScheduleRequest } from '@/entities/admin/model/admin.type'

export const useDeleteTrainingScheduleMutation = () => {
  return useMutation({
    mutationFn: ({ urls }: DeleteTrainingScheduleRequest) =>
      instance.delete<string>(`/admin/date-tag/${urls.id}`),
  })
}
