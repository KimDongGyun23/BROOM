import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { UpdateAccountRequest, UpdatePasswordRequest } from '@/types'
import type { CarpoolResponse } from '@/types/carpool'
import type { UserProfile } from '@/types/mypage'
import type { PostItemType } from '@/types/post'
import type { TeamResponse } from '@/types/team'

import { api } from '.'

const API_ENDPOINTS = {
  ACCOUNT: `/mypage/info`,
  DELETE_USER: `/exit`,
  FETCH_MYPAGE: `/mypage`,
  UPDATE_PASSWORD: `/mypage/password`,
  CARPOOL_POST: `/mypage/carpool`,
  TEAM_POST: `/mypage/team`,
  LOG_OUT: `/logout`,
} as const

const queryKeys = {
  all: ['mypage'] as const,
  account: () => [...queryKeys.all, 'account'] as const,
  myCarpoolPost: () => [...queryKeys.all, 'carpool'] as const,
  myTeamPost: () => [...queryKeys.all, 'team'] as const,
}

export const useUserProfile = () => {
  return useQuery<UserProfile, Error>({
    queryKey: queryKeys.all,
    queryFn: async () => await api.get(API_ENDPOINTS.FETCH_MYPAGE),
  })
}

export const useUserDeletion = () => {
  return useMutation<void, Error, void>({
    mutationFn: async () => api.delete(API_ENDPOINTS.DELETE_USER),
  })
}

export const useUpdateUserAccount = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, UpdateAccountRequest>({
    mutationFn: async ({ body }) => await api.put(API_ENDPOINTS.ACCOUNT, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.all }),
  })
}

export const useUpdatePassword = () => {
  return useMutation<string, Error, UpdatePasswordRequest>({
    mutationFn: async ({ body }) => await api.post(API_ENDPOINTS.UPDATE_PASSWORD, body),
  })
}

export const useMyTeamPost = () => {
  return useQuery<TeamResponse, Error, PostItemType[]>({
    queryKey: queryKeys.myTeamPost(),
    queryFn: async () => await api.get(API_ENDPOINTS.TEAM_POST),
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

export const useMyCarpoolPost = () => {
  return useQuery<CarpoolResponse, Error, PostItemType[]>({
    queryKey: queryKeys.myCarpoolPost(),
    queryFn: async () => await api.get(API_ENDPOINTS.CARPOOL_POST),
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

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => await api.post(API_ENDPOINTS.LOG_OUT, null),
  })
}
