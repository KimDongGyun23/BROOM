import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  CarpoolCreateRequest,
  CarpoolDeleteRequest,
  CarpoolDetailRequest,
  CarpoolDetailResponse,
  CarpoolEditRequest,
  CarpoolId,
  CarpoolIsFullRequest,
  CarpoolRecruitResponse,
  CarpoolResponse,
  CarpoolSearchRequest,
} from '@/types/carpool'
import type { CustomPostDetailType, PostItemType } from '@/types/post'

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

export const useCarpoolDetail = ({ urls }: CarpoolDetailRequest) => {
  return useQuery<CarpoolDetailResponse, Error, CustomPostDetailType>({
    queryKey: queryKeys.detail(urls),
    queryFn: async () => await api.get(API_ENDPOINTS.DETAIL(urls.carpoolBoardId)),
    select: (data) => {
      const { author, createdAt, carpoolBoardId, departPlace, departTime, ...rest } = data
      return {
        profile: { ...author, createdAt },
        item: {
          id: carpoolBoardId,
          place: departPlace,
          time: departTime,
          createdAt: createdAt,
          ...rest,
        },
      }
    },
  })
}

export const useSearchCarpoolList = ({ urls }: CarpoolSearchRequest) => {
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

export const useCreateCarpoolPost = () => {
  const queryClient = useQueryClient()

  return useMutation<CarpoolId, Error, CarpoolCreateRequest>({
    mutationFn: async ({ body }) => await api.post(API_ENDPOINTS.CREATE, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useMarkCarpoolAsFull = () => {
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
