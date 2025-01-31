import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { PostCreateRequest, PostDetailRequest, PostDetailResponse, PostId } from '@/types/post'

import { api } from '.'

const API_ENDPOINTS = {
  create: '/board',
  detail: (urls: PostDetailRequest['urls']) => `/board/view/${urls.boardId}`,
} as const

const queryKeys = {
  all: ['post'] as const,
  detail: (urls: PostDetailRequest['urls']) => [...queryKeys.all, ...Object.values(urls)] as const,
}

export const usePostDetail = ({ urls }: PostDetailRequest) => {
  return useQuery<PostDetailResponse>({
    queryKey: queryKeys.detail(urls),
    queryFn: async () => await api.get(API_ENDPOINTS.detail(urls)),
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation<PostId, Error, PostCreateRequest>({
    mutationFn: async ({ body }) => await api.post(API_ENDPOINTS.create, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
