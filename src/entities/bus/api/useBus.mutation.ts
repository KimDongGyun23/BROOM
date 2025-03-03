import { useMutation } from '@tanstack/react-query'

import { instance } from '@/app/api'

import type { BusApplicationRequest } from '../model/bus.type'

const ENDPOINTS = {
  reservation: `/bus/reservation`,
} as const

export const useBusApplicationMutation = () => {
  return useMutation({
    mutationFn: ({ body }: BusApplicationRequest) =>
      instance.post<string>(ENDPOINTS.reservation, body),
  })
}
