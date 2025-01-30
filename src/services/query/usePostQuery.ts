import { useQuery } from '@tanstack/react-query'

import type { PostDetailRequest, PostDetailResponse } from '@/types/post'

import { api } from '.'

const API_ENDPOINTS = {
  DETAIL: (urls: PostDetailRequest['urls']) => `/board/view/${urls.boardId}`,
} as const

const queryKeys = {
  all: ['post'] as const,
  detail: (urls: PostDetailRequest['urls']) => [...queryKeys.all, ...Object.values(urls)] as const,
}

export const usePostDetail = ({ urls }: PostDetailRequest) => {
  return useQuery<PostDetailResponse>({
    queryKey: queryKeys.detail(urls),
    queryFn: async () => await api.get(API_ENDPOINTS.DETAIL(urls)),
  })
}
