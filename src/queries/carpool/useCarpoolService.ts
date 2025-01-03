import { useQuery } from '@tanstack/react-query'

import type { CarpoolDetailRequest, CarpoolSearchRequest } from '@/types/carpool'

import { carpoolSearch } from './carpoolApi'

const queryKeys = {
  all: ['carpool'] as const,
  search: (urls: CarpoolSearchRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
  detail: (urls: CarpoolDetailRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
  recruit: () => [...queryKeys.all, 'recruit'] as const,
}

export const useCarpoolSearchPage = (request: CarpoolSearchRequest) => {
  return useQuery({
    queryKey: queryKeys.search(request.urls),
    queryFn: () => carpoolSearch(request),
    enabled: false,
  })
}
