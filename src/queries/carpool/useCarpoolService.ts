import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { CarpoolDetailRequest, CarpoolSearchRequest } from '@/types/carpool'

import {
  carpoolCheckFull,
  carpoolDelete,
  carpoolDetail,
  carpoolEdit,
  carpoolSearch,
} from './carpoolApi'

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

export const useCarpoolDetailPage = (request: CarpoolDetailRequest) => {
  return useQuery({
    queryKey: queryKeys.detail(request.urls),
    queryFn: () => carpoolDetail(request),
  })
}

export const useCarpoolEdit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: carpoolEdit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useCarpoolDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: carpoolDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useCarpoolCheckFull = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: carpoolCheckFull,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
