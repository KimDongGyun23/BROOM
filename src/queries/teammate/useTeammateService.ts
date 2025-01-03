import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { TeammateDetailRequest, TeammateSearchRequest } from '@/types/teammate'

import { teammateCheckFull, teammateSearch } from './teammateApi'

const queryKeys = {
  all: ['teammate'] as const,
  search: (urls: TeammateSearchRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
  detail: (urls: TeammateDetailRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
  recruit: () => [...queryKeys.all, 'recruit'] as const,
}

export const useTeammateSearchPage = (request: TeammateSearchRequest) => {
  return useQuery({
    queryKey: queryKeys.search(request.urls),
    queryFn: () => teammateSearch(request),
    enabled: false,
  })
}

export const useTeammateCheckFull = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: teammateCheckFull,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
