import { useMutation, useQuery } from '@tanstack/react-query'

import type { BusReservationCreate, BusReservationQuery, ReservationStatus } from '@/types/bus'

import { api } from '.'

const busReserveInfo = async ({ urls }: BusReservationQuery) => {
  return await api.get<ReservationStatus>(`/bus/reservation/${urls.studentId}`)
}

const busReserve = async ({ body }: BusReservationCreate) => {
  return await api.post(`/bus/reservation`, body)
}

const queryKeys = {
  all: ['bus'] as const,
  reserveInfo: (urls: BusReservationQuery['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
}

export const useBusReserveInfo = (request: BusReservationQuery) => {
  return useQuery({
    queryKey: queryKeys.reserveInfo(request.urls),
    queryFn: () => busReserveInfo(request),
    enabled: false,
  })
}

export const useBusReserve = () => {
  return useMutation({
    mutationFn: busReserve,
  })
}
