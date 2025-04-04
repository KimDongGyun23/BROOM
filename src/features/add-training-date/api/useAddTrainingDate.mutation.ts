import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { instance } from '@/app/api'
import type {
  AddTrainingDateRequest,
  AddTrainingDateResponse,
} from '@/entities/admin/model/admin.type'

export const useAddTrainingDateMutation = () => {
  return useMutation<AddTrainingDateResponse, AxiosError<string>, AddTrainingDateRequest>({
    mutationFn: ({ body }) => instance.post(`/admin/date-tag`, body),
  })
}
