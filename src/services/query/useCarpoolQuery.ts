import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  PostDeleteRequest,
  PostDetailRequest,
  PostIsFullRequest,
  PostRecruitResponse,
  PostResponse,
  PostSearchRequest,
} from '@/types/post'

import { api } from '.'

const API_ENDPOINTS = {
  CARPOOL: '/view/carpool',
  ACTIVE_CARPOOL: '/view/carpool/recruiting',
  CREATE: '/board',
  DETAIL: (id: number) => `/view/carpool/${id}`,
  CHECK_FULL: (id: number) => `/carpool/check/${id}`,
  DELETE: (id: number) => `/carpool/${id}`,
  EDIT: (id: number) => `/carpool/edit/${id}`,
  SEARCH: (category: string, keyword: string) =>
    `/view/carpool?category=${category}&keyword=${keyword}`,
} as const

const queryKeys = {
  all: ['carpool'] as const,
  activeCarpool: () => [...queryKeys.all, 'recruit'] as const,
  detail: (urls: PostDetailRequest['urls']) => [...queryKeys.all, ...Object.values(urls)] as const,
  search: (urls: PostSearchRequest['urls']) => [...queryKeys.all, ...Object.values(urls)] as const,
}

export const useCarpoolList = () => {
  return useQuery<PostResponse>({
    queryKey: queryKeys.all,
    queryFn: async () => await api.get(API_ENDPOINTS.CARPOOL),
    gcTime: 0,
    staleTime: 0,
  })
}

export const useActiveCarpoolList = () => {
  return useQuery<PostRecruitResponse[]>({
    queryKey: queryKeys.activeCarpool(),
    queryFn: async () => await api.get(API_ENDPOINTS.ACTIVE_CARPOOL),
    gcTime: 0,
    staleTime: 0,
    enabled: false,
  })
}

export const useSearchCarpoolList = ({ urls }: PostSearchRequest) => {
  return useQuery<PostResponse>({
    queryKey: queryKeys.search(urls),
    queryFn: async () => await api.get(API_ENDPOINTS.SEARCH(urls.category, urls.keyword)),
  })
}

export const useMarkCarpoolAsFull = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, PostIsFullRequest>({
    mutationFn: async ({ body, urls }) =>
      await api.put(API_ENDPOINTS.CHECK_FULL(urls.boardId), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useDeleteCarpool = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, PostDeleteRequest>({
    mutationFn: async ({ urls }) => await api.delete(API_ENDPOINTS.DELETE(urls.boardId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
