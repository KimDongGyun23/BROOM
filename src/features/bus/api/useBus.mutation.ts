import { useMutation } from '@tanstack/react-query'

import { instance } from '@/query'

import type { BusReservationRequest } from '../model/bus.type'

const ENDPOINTS = {
  reservation: `/bus/reservation`,
} as const

export const useBusReservationMutation = () => {
  return useMutation({
    mutationFn: ({ body }: BusReservationRequest) =>
      instance.post<string>(ENDPOINTS.reservation, body),
  })
}
