import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { TeammateDetailRequest, TeammateSearchRequest } from '@/types/teammate'

import {
  teammateCheckFull,
  teammateDelete,
  teammateDetail,
  teammateEdit,
  teammateSearch,
} from './teammateApi'

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

export const useTeammateDetailPage = (request: TeammateDetailRequest) => {
  return useQuery({
    queryKey: queryKeys.detail(request.urls),
    queryFn: () => teammateDetail(request),
  })
}

export const useTeammateEdit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: teammateEdit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useTeammateDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: teammateDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
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
