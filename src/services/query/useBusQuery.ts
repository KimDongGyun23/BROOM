import { useMutation, useQuery } from '@tanstack/react-query'

import { api } from '@/queries'
import type { BusReserveInfoReqeust, BusReserveInfoResponse, BusReserveReqeust } from '@/types'

const queryKeys = {
  all: ['bus'] as const,
  reserveInfo: (urls: BusReserveInfoReqeust['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
}

const busReserveInfo = async ({ urls }: BusReserveInfoReqeust) => {
  return await api.get<BusReserveInfoResponse>(`/bus/reservation/${urls.studentId}`)
}

const busReserve = async ({ body }: BusReserveReqeust) => {
  return await api.post(`/bus/reservation`, body)
}

export const useBusReserveInfo = (request: BusReserveInfoReqeust) => {
  return useQuery({
    queryKey: queryKeys.reserveInfo(request.urls),
    queryFn: () => busReserveInfo(request),
    enabled: false,
  })
}

export const useBuseReserve = () => {
  return useMutation({
    mutationFn: busReserve,
  })
}
