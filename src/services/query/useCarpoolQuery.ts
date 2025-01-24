import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  PostCreateRequest,
  PostDeleteRequest,
  PostDetailRequest,
  PostDetailResponse,
  PostEditRequest,
  PostId,
  PostIsFullRequest,
  PostRecruitResponse,
  PostResponse,
  PostSearchRequest,
} from '@/types/post'

import { api } from '.'

const API_ENDPOINTS = {
  CARPOOL: '/view/carpool',
  ACTIVE_CARPOOL: '/view/carpool/recruiting',
  CREATE: '/carpool',
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

export const useCarpoolDetail = ({ urls }: PostDetailRequest) => {
  return useQuery<PostDetailResponse, Error>({
    queryKey: queryKeys.detail(urls),
    queryFn: async () => await api.get(API_ENDPOINTS.DETAIL(urls.boardId)),
  })
}

export const useSearchCarpoolList = ({ urls }: PostSearchRequest) => {
  return useQuery<PostResponse>({
    queryKey: queryKeys.search(urls),
    queryFn: async () => await api.get(API_ENDPOINTS.SEARCH(urls.category, urls.keyword)),
  })
}

export const useCreateCarpoolPost = () => {
  const queryClient = useQueryClient()

  return useMutation<PostId, Error, PostCreateRequest>({
    mutationFn: async ({ body }) => await api.post(API_ENDPOINTS.CREATE, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
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

export const useUpdateCarpool = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, PostEditRequest>({
    mutationFn: async ({ body, urls }) => await api.put(API_ENDPOINTS.EDIT(urls.boardId), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
