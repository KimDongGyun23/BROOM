import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { api } from '@/queries'
import type {
  CustomTeammateDetailType,
  TeammateCreateRequest,
  TeammateCreateResponse,
  TeammateDeleteRequest,
  TeammateDetailRequest,
  TeammateDetailResponse,
  TeammateEditRequest,
  TeammateIsFullRequest,
  TeammateRecruitResponse,
  TeammateResponse,
  TeammateSearchRequest,
} from '@/types'
import type { PostItemType } from '@/types/post'

const API_ENDPOINTS = {
  TEAMMATE: `/view/team`,
  ACTIVE_TEAMMATE: `/view/team/recruiting`,
  CREATE: `/team`,
  DETAIL: (id: number) => `/view/team/${id}`,
  CHECK_FULL: (id: number) => `/team/check/${id}`,
  DELETE: (id: number) => `/team/${id}`,
  EDIT: (id: number) => `/team/edit/${id}`,
  SEARCH: (category: string, keyword: string) =>
    `/view/team?category=${category}&keyword=${keyword}`,
} as const

const queryKeys = {
  all: ['teammate'] as const,
  search: (urls: TeammateSearchRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
  detail: (urls: TeammateDetailRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
  activeTeammate: () => [...queryKeys.all, 'activeTeammate'] as const,
}

export const useTeammateList = () => {
  return useQuery<TeammateResponse, Error, PostItemType[]>({
    queryKey: queryKeys.all,
    queryFn: async () => await api.get(API_ENDPOINTS.TEAMMATE),
    gcTime: 0,
    staleTime: 0,
    select: (data) =>
      data.result.map((item) => ({
        ...item,
        id: item.teamBoardId,
        place: item.meetingPlace,
        time: item.meetingTime,
      })),
  })
}

export const useActiveTeammateList = () => {
  return useQuery<TeammateRecruitResponse, Error, PostItemType[]>({
    queryKey: queryKeys.activeTeammate(),
    queryFn: async () => await api.get(API_ENDPOINTS.ACTIVE_TEAMMATE),
    gcTime: 0,
    staleTime: 0,
    enabled: false,
    select: (data) =>
      data.result.map((item) => ({
        ...item,
        id: item.teamBoardId,
        place: item.meetingPlace,
        time: item.meetingTime,
      })),
  })
}

export const useTeammateDetailPage = ({ urls }: TeammateDetailRequest) => {
  return useQuery<TeammateDetailResponse, Error, CustomTeammateDetailType>({
    queryKey: queryKeys.detail(urls),
    queryFn: async () => await api.get(API_ENDPOINTS.DETAIL(urls.teamBoardId)),
    select: (data) => {
      const { author, createdAt, ...rest } = data
      return {
        profile: { ...author, createdAt: createdAt },
        item: { ...rest },
      }
    },
  })
}

export const useTeammateSearchList = ({ urls }: TeammateSearchRequest) => {
  return useQuery<TeammateResponse, Error, PostItemType[]>({
    queryKey: queryKeys.search(urls),
    queryFn: async () => await api.get(API_ENDPOINTS.SEARCH(urls.category, urls.keyword)),
    select: (data) =>
      data.result.map((item) => ({
        ...item,
        id: item.teamBoardId,
        place: item.meetingPlace,
        time: item.meetingTime,
      })),
  })
}

export const useTeammateCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<TeammateCreateResponse, Error, TeammateCreateRequest>({
    mutationFn: async ({ body }) => await api.post(API_ENDPOINTS.CREATE, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useDeleteTeammate = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, TeammateDeleteRequest>({
    mutationFn: async ({ urls }) => await api.delete(API_ENDPOINTS.DELETE(urls.teamBoardId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useUpdateTeammate = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, TeammateEditRequest>({
    mutationFn: async ({ body, urls }) => await api.put(API_ENDPOINTS.EDIT(urls.teamBoardId), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useTeammateCheckFull = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, TeammateIsFullRequest>({
    mutationFn: async ({ body, urls }) =>
      await api.put(API_ENDPOINTS.CHECK_FULL(urls.teamBoardId), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
