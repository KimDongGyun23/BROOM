import { useQuery } from '@tanstack/react-query'

import { instance } from '../../../app/api'
import type { BusApplicationStatusRequest, BusPassenger } from '../model/bus.type'

const queryKeys = {
  all: ['bus'] as const,
  reservation: (urls: BusApplicationStatusRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
}

export const useFetchBusApplicationStatus = ({ urls }: BusApplicationStatusRequest) => {
  return useQuery({
    queryKey: queryKeys.reservation(urls),
    queryFn: async () => await instance.get<BusPassenger>(`/bus/reservation/${urls.studentId}`),
    enabled: false,
  })
}
