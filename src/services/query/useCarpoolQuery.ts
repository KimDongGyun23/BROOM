import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  CarpoolCreateRequest,
  CarpoolCreateResponse,
  CarpoolDeleteRequest,
  CarpoolDetailRequest,
  CarpoolDetailResponse,
  CarpoolEditRequest,
  CarpoolIsFullRequest,
  CarpoolRecruitResponse,
  CarpoolResponse,
  CarpoolSearchRequest,
  CustomCarpoolDetailType,
} from '@/types'
import type { PostItemType } from '@/types/post'

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
  detail: (urls: CarpoolDetailRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
  search: (urls: CarpoolSearchRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
}

export const useCarpoolList = () => {
  return useQuery<CarpoolResponse, Error, PostItemType[]>({
    queryKey: queryKeys.all,
    queryFn: async () => await api.get(API_ENDPOINTS.CARPOOL),
    gcTime: 0,
    staleTime: 0,
    select: (data) =>
      data.result.map((item) => ({
        ...item,
        id: item.carpoolBoardId,
        place: item.departPlace,
        time: item.departTime,
      })),
  })
}

export const useActiveCarpoolList = () => {
  return useQuery<CarpoolRecruitResponse, Error, PostItemType[]>({
    queryKey: queryKeys.activeCarpool(),
    queryFn: async () => await api.get(API_ENDPOINTS.ACTIVE_CARPOOL),
    gcTime: 0,
    staleTime: 0,
    enabled: false,
    select: (data) =>
      data.result.map((item) => ({
        ...item,
        id: item.carpoolBoardId,
        place: item.departPlace,
        time: item.departTime,
      })),
  })
}

export const useCarpoolDetailPage = ({ urls }: CarpoolDetailRequest) => {
  return useQuery<CarpoolDetailResponse, Error, CustomCarpoolDetailType>({
    queryKey: queryKeys.detail(urls),
    queryFn: async () => await api.get(API_ENDPOINTS.DETAIL(urls.carpoolBoardId)),
    select: (data) => {
      const { author, createdAt, ...rest } = data
      return {
        profile: { ...author, createdAt: createdAt },
        item: { ...rest },
      }
    },
  })
}

export const useCarpoolSearchList = ({ urls }: CarpoolSearchRequest) => {
  return useQuery<CarpoolResponse, Error, PostItemType[]>({
    queryKey: queryKeys.search(urls),
    queryFn: async () => await api.get(API_ENDPOINTS.SEARCH(urls.category, urls.keyword)),
    select: (data) =>
      data.result.map((item) => ({
        ...item,
        id: item.carpoolBoardId,
        place: item.departPlace,
        time: item.departTime,
      })),
  })
}

export const useCarpoolCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<CarpoolCreateResponse, Error, CarpoolCreateRequest>({
    mutationFn: async ({ body }) => await api.post(API_ENDPOINTS.CREATE, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useCarpoolCheckFull = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, CarpoolIsFullRequest>({
    mutationFn: async ({ body, urls }) =>
      await api.put(API_ENDPOINTS.CHECK_FULL(urls.carpoolBoardId), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useDeleteCarpool = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, CarpoolDeleteRequest>({
    mutationFn: async ({ urls }) => await api.delete(API_ENDPOINTS.DELETE(urls.carpoolBoardId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useUpdateCarpool = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, CarpoolEditRequest>({
    mutationFn: async ({ body, urls }) =>
      await api.put(API_ENDPOINTS.EDIT(urls.carpoolBoardId), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
