import { useMutation, useQuery } from '@tanstack/react-query'

import type { BusReservationCreate, BusReservationQuery, ReservationStatus } from '@/types/bus'

import { api } from '.'

const getBusReservation = async ({ urls }: BusReservationQuery) => {
  return await api.get<ReservationStatus>(`/bus/reservation/${urls.studentId}`)
}

const createBusReservation = async ({ body }: BusReservationCreate) => {
  return await api.post(`/bus/reservation`, body)
}

const queryKeys = {
  all: ['bus'] as const,
  reserveInfo: (urls: BusReservationQuery['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
}

export const useBusReservationQuery = (request: BusReservationQuery) => {
  return useQuery({
    queryKey: queryKeys.reserveInfo(request.urls),
    queryFn: () => getBusReservation(request),
    enabled: false,
  })
}

export const useBusReservationMutation = () => {
  return useMutation({
    mutationFn: createBusReservation,
  })
}
