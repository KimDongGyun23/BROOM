import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  TeamCreateRequest,
  TeamCreateResponse,
  TeamDeleteRequest,
  TeamDetailRequest,
  TeamDetailResponse,
  TeamEditRequest,
  TeamIsFullRequest,
  TeamRecruitResponse,
  TeamResponse,
  TeamSearchRequest,
} from '@/types'
import type { CustomPostDetailType, PostItemType } from '@/types/post'

import { api } from '.'

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
  all: ['team'] as const,
  search: (urls: TeamSearchRequest['urls']) => [...queryKeys.all, ...Object.values(urls)] as const,
  detail: (urls: TeamDetailRequest['urls']) => [...queryKeys.all, ...Object.values(urls)] as const,
  activeTeam: () => [...queryKeys.all, 'activeTeam'] as const,
}

export const useTeamList = () => {
  return useQuery<TeamResponse, Error, PostItemType[]>({
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

export const useActiveTeamList = () => {
  return useQuery<TeamRecruitResponse, Error, PostItemType[]>({
    queryKey: queryKeys.activeTeam(),
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

export const useTeamDetailPage = ({ urls }: TeamDetailRequest) => {
  return useQuery<TeamDetailResponse, Error, CustomPostDetailType>({
    queryKey: queryKeys.detail(urls),
    queryFn: async () => await api.get(API_ENDPOINTS.DETAIL(urls.teamBoardId)),
    select: (data) => {
      const { author, createdAt, teamBoardId, meetingPlace, meetingTime, ...rest } = data
      return {
        profile: { ...author, createdAt },
        item: {
          id: teamBoardId,
          place: meetingPlace,
          time: meetingTime,
          createdAt: createdAt,
          ...rest,
        },
      }
    },
  })
}

export const useTeamSearchList = ({ urls }: TeamSearchRequest) => {
  return useQuery<TeamResponse, Error, PostItemType[]>({
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

export const useTeamCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<TeamCreateResponse, Error, TeamCreateRequest>({
    mutationFn: async ({ body }) => await api.post(API_ENDPOINTS.CREATE, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useDeleteTeam = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, TeamDeleteRequest>({
    mutationFn: async ({ urls }) => await api.delete(API_ENDPOINTS.DELETE(urls.teamBoardId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useUpdateTeam = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, TeamEditRequest>({
    mutationFn: async ({ body, urls }) => await api.put(API_ENDPOINTS.EDIT(urls.teamBoardId), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useTeamCheckFull = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, TeamIsFullRequest>({
    mutationFn: async ({ body, urls }) =>
      await api.put(API_ENDPOINTS.CHECK_FULL(urls.teamBoardId), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
