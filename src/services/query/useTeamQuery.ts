import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  PostCreateRequest,
  PostDetailRequest,
  PostDetailResponse,
  PostId,
  PostRecruitResponse,
  PostResponse,
  PostSearchRequest,
} from '@/types/post'

import { instance } from '.'

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
  search: (urls: PostSearchRequest['urls']) => [...queryKeys.all, ...Object.values(urls)] as const,
  detail: (urls: PostDetailRequest['urls']) => [...queryKeys.all, ...Object.values(urls)] as const,
  activeTeam: () => [...queryKeys.all, 'activeTeam'] as const,
}

export const useTeamList = () => {
  return useQuery<PostResponse, Error>({
    queryKey: queryKeys.all,
    queryFn: async () => await instance.get(API_ENDPOINTS.TEAMMATE),
    gcTime: 0,
    staleTime: 0,
  })
}

export const useActiveTeamList = () => {
  return useQuery<PostRecruitResponse, Error>({
    queryKey: queryKeys.activeTeam(),
    queryFn: async () => await instance.get(API_ENDPOINTS.ACTIVE_TEAMMATE),
    gcTime: 0,
    staleTime: 0,
    enabled: false,
  })
}

export const useTeamDetailPage = ({ urls }: PostDetailRequest) => {
  return useQuery<PostDetailResponse, Error>({
    queryKey: queryKeys.detail(urls),
    queryFn: async () => await instance.get(API_ENDPOINTS.DETAIL(urls.boardId)),
  })
}

export const useTeamSearchList = ({ urls }: PostSearchRequest) => {
  return useQuery<PostResponse, Error>({
    queryKey: queryKeys.search(urls),
    queryFn: async () => await instance.get(API_ENDPOINTS.SEARCH(urls.category, urls.keyword)),
  })
}

export const useTeamCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<PostId, Error, PostCreateRequest>({
    mutationFn: async ({ body }) => await instance.post(API_ENDPOINTS.CREATE, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
