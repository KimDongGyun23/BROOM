import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { UpdateAccountRequest, UpdatePasswordRequest, UserProfile } from '@/types/mypage'
import type { PostResponse } from '@/types/post'

import { instance } from '.'

const ENDPOINTS = {
  ACCOUNT: `/mypage/info`,
  fetchMypage: `/mypage`,
  updatePassword: `/mypage/password`,
  CARPOOL_POST: `/mypage/carpool`,
  TEAM_POST: `/mypage/team`,
  logout: `/logout`,
  deleteUser: `/exit`,
} as const

const queryKeys = {
  all: ['mypage'] as const,
  account: () => [...queryKeys.all, 'account'] as const,
  myCarpoolPost: () => [...queryKeys.all, 'carpool'] as const,
  myTeamPost: () => [...queryKeys.all, 'team'] as const,
}

export const useUserProfile = () => {
  return useQuery<UserProfile>({
    queryKey: queryKeys.all,
    queryFn: async () => await instance.get(ENDPOINTS.fetchMypage),
  })
}

export const useUpdateUserAccount = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, UpdateAccountRequest>({
    mutationFn: async ({ body }) => await instance.put(ENDPOINTS.ACCOUNT, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.all }),
  })
}

export const useUpdatePassword = () => {
  return useMutation<string, Error, UpdatePasswordRequest>({
    mutationFn: async ({ body }) => await instance.post(ENDPOINTS.updatePassword, body),
  })
}

export const useMyTeamPost = () => {
  return useQuery<PostResponse, Error>({
    queryKey: queryKeys.myTeamPost(),
    queryFn: async () => await instance.get(ENDPOINTS.TEAM_POST),
    gcTime: 0,
    staleTime: 0,
  })
}

export const useMyCarpoolPost = () => {
  return useQuery<PostResponse, Error>({
    queryKey: queryKeys.myCarpoolPost(),
    queryFn: async () => await instance.get(ENDPOINTS.CARPOOL_POST),
    gcTime: 0,
    staleTime: 0,
  })
}

export const useLogout = () => {
  return useMutation<string>({
    mutationFn: async () => await instance.post(ENDPOINTS.logout, null),
  })
}

export const useUserDeletion = () => {
  return useMutation<string>({
    mutationFn: async () => instance.delete(ENDPOINTS.deleteUser),
  })
}
