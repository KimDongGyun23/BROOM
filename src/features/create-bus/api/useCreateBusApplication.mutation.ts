import { useMutation } from '@tanstack/react-query'

import { instance } from '@/app/api'
import type { BusApplicationRequest } from '@/entities/bus/model/bus.type'

export const useCreateBusApplicationMutation = () => {
  return useMutation({
    mutationFn: ({ body }: BusApplicationRequest) =>
      instance.post<string>('/bus/reservation', body),
  })
}
