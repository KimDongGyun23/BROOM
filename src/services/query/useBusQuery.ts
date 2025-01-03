import { useMutation, useQuery } from '@tanstack/react-query'

import { api } from '@/queries'
import type { BusReserveInfoRequest, BusReserveInfoResponse, BusReserveRequest } from '@/types'

const busReserveInfo = async ({ urls }: BusReserveInfoRequest) => {
  return await api.get<BusReserveInfoResponse>(`/bus/reservation/${urls.studentId}`)
}

const busReserve = async ({ body }: BusReserveRequest) => {
  return await api.post(`/bus/reservation`, body)
}

const queryKeys = {
  all: ['bus'] as const,
  reserveInfo: (urls: BusReserveInfoRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
}

export const useBusReserveInfo = (request: BusReserveInfoRequest) => {
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
