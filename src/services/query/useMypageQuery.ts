import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  CarpoolFetchResponse,
  MypageInfoResponse,
  TeamsFetchResponse,
  UpdateAccountRequest,
  UpdatePasswordRequest,
} from '@/types'

import { api } from '.'

const fetchInfo = async () => {
  return await api.get<MypageInfoResponse>(`/mypage`)
}

const deleteUser = async () => {
  return await api.delete(`/exit`)
}

const updateAccount = async ({ body }: UpdateAccountRequest) => {
  return await api.put(`/mypage/info`, body)
}

const updatePassword = async ({ body }: UpdatePasswordRequest) => {
  return await api.post<string>(`/mypage/password`, body)
}

const carpoolPosts = async () => {
  return await api.get<CarpoolFetchResponse>(`/mypage/carpool`)
}

const teamPosts = async () => {
  return await api.get<TeamsFetchResponse>(`/mypage/team`)
}

const logout = async () => {
  return await api.post(`/logout`, undefined)
}

const queryKeys = {
  all: ['mypage'] as const,
  account: () => [...queryKeys.all, 'account'] as const,
  myCarpoolPost: () => [...queryKeys.all, 'carpool'] as const,
  myTeamPost: () => [...queryKeys.all, 'team'] as const,
}

export const useUserProfile = () => {
  return useQuery({
    queryKey: queryKeys.all,
    queryFn: fetchInfo,
  })
}

export const useUserDeletion = () => {
  return useMutation({
    mutationFn: deleteUser,
  })
}

export const useUpdateUserAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateAccount,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.all }),
  })
}

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePassword,
  })
}

export const useMyTeamPost = () => {
  return useQuery({
    queryKey: queryKeys.myTeamPost(),
    queryFn: teamPosts,
    gcTime: 0,
    staleTime: 0,
  })
}

export const useMyCarpoolPost = () => {
  return useQuery({
    queryKey: queryKeys.myCarpoolPost(),
    queryFn: carpoolPosts,
    gcTime: 0,
    staleTime: 0,
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  })
}
