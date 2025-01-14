import { useMutation, useQuery } from '@tanstack/react-query'

import type {
  BusReservationInfoRequest,
  BusReservationRequest,
  ReservationStatus,
} from '@/types/bus'

import { api } from '.'

const API_ENDPOINTS = {
  RESERVATION: (studentId: string) => `/bus/reservation/${studentId}`,
} as const

const queryKeys = {
  all: ['bus'] as const,
  reservation: (urls: BusReservationInfoRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
}

export const useBusReservationQuery = ({ urls }: BusReservationInfoRequest) => {
  return useQuery<ReservationStatus, Error>({
    queryKey: queryKeys.reservation(urls),
    queryFn: async () => await api.get(API_ENDPOINTS.RESERVATION(urls.studentId)),
    enabled: false,
  })
}

export const useBusReservationMutation = () => {
  return useMutation<void, Error, BusReservationRequest>({
    mutationFn: async ({ body }) => await api.post(`/bus/reservation`, body),
  })
}
