import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  PostCreateRequest,
  PostDeleteBookmarkRequest,
  PostDeleteRequest,
  PostDetailRequest,
  PostDetailResponse,
  PostEditRequest,
  PostForm,
  PostId,
  PostIsFullRequest,
  PostSetBookmarkRequest,
} from '@/types/post'

import { api } from '.'

const API_ENDPOINTS = {
  create: '/board',
  edit: (urls: PostDetailRequest['urls']) => `/board/${urls.boardId}`,
  detail: (urls: PostDetailRequest['urls']) => `/board/view/${urls.boardId}`,
  delete: (urls: PostDeleteRequest['urls']) => `/board/${urls.boardId}`,
  markIsFull: (urls: PostIsFullRequest['urls']) => `/board/check/${urls.boardId}`,
  setBookmark: `/mypage/bookmark`,
  deleteBookmark: (urls: PostDeleteBookmarkRequest['urls']) => `/mypage/bookmark/${urls.boardId}`,
} as const

const queryKeys = {
  all: ['post'] as const,
  detail: (boardId: number) => [...queryKeys.all, 'detail', boardId] as const,
}

export const usePostDetail = ({ urls }: PostDetailRequest) => {
  return useQuery<PostDetailResponse>({
    queryKey: queryKeys.detail(urls.boardId),
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

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation<PostId, Error, PostEditRequest>({
    mutationFn: async ({ body, urls }) => await api.patch(API_ENDPOINTS.edit(urls), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useFetchUpdatePostData = ({ urls }: PostDetailRequest) => {
  return useQuery<PostDetailResponse, Error, PostForm>({
    queryKey: queryKeys.detail(urls.boardId),
    queryFn: async () => await api.get(API_ENDPOINTS.detail(urls)),
    select: (data): PostForm => {
      const { title, trainingDate, place, time, personnel, content } = data
      const [hour, minute] = time.split(':')
      return {
        title,
        trainingDate,
        place,
        content,
        hour,
        minute,
        personnel: personnel.toString(),
      }
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, PostDeleteRequest>({
    mutationFn: async ({ urls }) => await api.delete(API_ENDPOINTS.delete(urls)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useMarkPostAsFull = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, PostIsFullRequest>({
    mutationFn: async ({ body, urls }) => await api.patch(API_ENDPOINTS.markIsFull(urls), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useSetBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, PostSetBookmarkRequest>({
    mutationFn: async ({ body }) => await api.post(API_ENDPOINTS.setBookmark, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, PostDeleteBookmarkRequest>({
    mutationFn: async ({ urls }) => await api.delete(API_ENDPOINTS.deleteBookmark(urls)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
