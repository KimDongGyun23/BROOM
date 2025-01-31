import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { UpdateAccountRequest, UpdatePasswordRequest, UserProfile } from '@/types/mypage'
import type { PostResponse } from '@/types/post'

import { instance } from '.'

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
    queryFn: async () => await instance.get(API_ENDPOINTS.FETCH_MYPAGE),
  })
}

export const useUserDeletion = () => {
  return useMutation<void, Error, void>({
    mutationFn: async () => instance.delete(API_ENDPOINTS.DELETE_USER),
  })
}

export const useUpdateUserAccount = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, UpdateAccountRequest>({
    mutationFn: async ({ body }) => await instance.put(API_ENDPOINTS.ACCOUNT, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.all }),
  })
}

export const useUpdatePassword = () => {
  return useMutation<string, Error, UpdatePasswordRequest>({
    mutationFn: async ({ body }) => await instance.post(API_ENDPOINTS.UPDATE_PASSWORD, body),
  })
}

export const useMyTeamPost = () => {
  return useQuery<PostResponse, Error>({
    queryKey: queryKeys.myTeamPost(),
    queryFn: async () => await instance.get(API_ENDPOINTS.TEAM_POST),
    gcTime: 0,
    staleTime: 0,
  })
}

export const useMyCarpoolPost = () => {
  return useQuery<PostResponse, Error>({
    queryKey: queryKeys.myCarpoolPost(),
    queryFn: async () => await instance.get(API_ENDPOINTS.CARPOOL_POST),
    gcTime: 0,
    staleTime: 0,
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => await instance.post(API_ENDPOINTS.LOG_OUT, null),
  })
}
