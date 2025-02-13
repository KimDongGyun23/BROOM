import { useMutation, useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

import type {
  BusReservationInfoRequest,
  BusReservationRequest,
  ReservationStatus,
} from '@/types/bus'

import { instance } from '.'

const API_ENDPOINTS = {
  RESERVATION: (studentId: string) => `/bus/reservation/${studentId}`,
} as const

const queryKeys = {
  all: ['bus'] as const,
  reservation: (urls: BusReservationInfoRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
}

export const useBusReservationQuery = ({ urls }: BusReservationInfoRequest) => {
  return useQuery<ReservationStatus, AxiosError>({
    queryKey: queryKeys.reservation(urls),
    queryFn: async () => await instance.get(API_ENDPOINTS.RESERVATION(urls.studentId)),
    enabled: false,
  })
}

export const useBusReservationMutation = () => {
  return useMutation<AxiosResponse<string>, AxiosError, BusReservationRequest>({
    mutationFn: async ({ body }) => await instance.post(`/bus/reservation`, body),
  })
}
