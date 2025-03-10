import { useQuery } from '@tanstack/react-query'

import { instance } from '../../../app/api'
import type { BusApplicationInfoRequest, ReservationStatus } from '../model/bus.type'

const ENDPOINTS = {
  reservation: (studentId: string) => `/bus/reservation/${studentId}`,
} as const

const queryKeys = {
  all: ['bus'] as const,
  reservation: (urls: BusApplicationInfoRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
}

export const useBusApplicationQuery = ({ urls }: BusApplicationInfoRequest) => {
  return useQuery({
    queryKey: queryKeys.reservation(urls),
    queryFn: async () =>
      await instance.get<ReservationStatus>(ENDPOINTS.reservation(urls.studentId)),
    enabled: false,
  })
}
