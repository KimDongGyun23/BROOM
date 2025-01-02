import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { api } from '@/queries'
import type {
  CarpoolCreateRequest,
  CarpoolCreateResponse,
  CarpoolRecruitResponse,
  CarpoolResponse,
} from '@/types'
import type { PostItemType } from '@/types/post'

const API_ENDPOINTS = {
  CARPOOL: '/view/carpool',
  ACTIVE_CARPOOL: '/view/carpool/recruiting',
  CREATE: '/carpool',
} as const

const queryKeys = {
  all: ['carpool'] as const,
  activeCarpool: () => [...queryKeys.all, 'recruit'] as const,
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

export const useCarpoolCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<CarpoolCreateResponse, Error, CarpoolCreateRequest>({
    mutationFn: async () => await api.get(API_ENDPOINTS.CREATE),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
