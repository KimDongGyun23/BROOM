import { useQuery } from '@tanstack/react-query'

import { api } from '@/queries'
import type {
  TeammateDetailRequest,
  TeammateRecruitResponse,
  TeammateResponse,
  TeammateSearchRequest,
} from '@/types'
import type { PostItemType } from '@/types/post'

const API_ENDPOINTS = {
  TEAMMATE: '/view/team',
  ACTIVE_TEAMMATE: '/view/team/recruiting',
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
