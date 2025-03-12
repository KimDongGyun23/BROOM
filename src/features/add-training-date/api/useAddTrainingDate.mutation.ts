import { useMutation } from '@tanstack/react-query'

import { instance } from '@/app/api'
import type {
  AddTrainingDateRequest,
  AddTrainingDateResponse,
} from '@/entities/admin/model/admin.type'

export const useAddTrainingDateMutation = () => {
  return useMutation({
    mutationFn: ({ body }: AddTrainingDateRequest) =>
      instance.post<AddTrainingDateResponse>(`/admin/date-tag`, body),
  })
}
