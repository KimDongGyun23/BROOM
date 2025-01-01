import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { api } from '@/queries'
import type {
  CarpoolFetchResponse,
  MypageInfoResponse,
  TeammatesFetchResponse,
  UpdateAccountRequest,
  UpdatePasswordRequest,
} from '@/types'

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

const teammatePosts = async () => {
  return await api.get<TeammatesFetchResponse>(`/mypage/team`)
}

const queryKeys = {
  all: ['mypage'] as const,
  account: () => [...queryKeys.all, 'account'] as const,
  myCarpoolPost: () => [...queryKeys.all, 'carpool'] as const,
  myTeammatePost: () => [...queryKeys.all, 'teammate'] as const,
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

export const useMyTeammatePost = () => {
  return useQuery({
    queryKey: queryKeys.myTeammatePost(),
    queryFn: teammatePosts,
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
