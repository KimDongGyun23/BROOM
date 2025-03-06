import { useMutation } from '@tanstack/react-query'

import { instance } from '@/app/api'
import type {
  CreateTrainingScheduleRequest,
  CreateTrainingScheduleResponse,
} from '@/entities/admin/model/admin.type'

export const useCreateTrainingScheduleMutation = () => {
  return useMutation({
    mutationFn: ({ body }: CreateTrainingScheduleRequest) =>
      instance.post<CreateTrainingScheduleResponse>(`/admin/date-tag`, body),
  })
}
