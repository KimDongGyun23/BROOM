import { useQuery } from '@tanstack/react-query'

import type { BusReservationInfoRequest, ReservationStatus } from '@/features/bus/model/bus.type'

import { instance } from '../../../query'

const ENDPOINTS = {
  reservation: (studentId: string) => `/bus/reservation/${studentId}`,
} as const

const queryKeys = {
  all: ['bus'] as const,
  reservation: (urls: BusReservationInfoRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
}

export const useBusReservationQuery = ({ urls }: BusReservationInfoRequest) => {
  return useQuery({
    queryKey: queryKeys.reservation(urls),
    queryFn: async () =>
      await instance.get<ReservationStatus>(ENDPOINTS.reservation(urls.studentId)),
    enabled: false,
  })
}
