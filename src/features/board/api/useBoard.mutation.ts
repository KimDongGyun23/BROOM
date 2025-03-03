import { useMutation, useQueryClient } from '@tanstack/react-query'

import type {
  AddBookmarkRequest,
  PostCreateRequest,
  PostDeleteRequest,
  PostDetailRequest,
  PostEditRequest,
  PostId,
  RemoveBookmarkRequest,
} from '@/features/board/model/post.type'

import { instance } from '../../../app/api'

import { queryKeys } from './useBoard.query'

const ENDPOINTS = {
  createPost: '/board',
  editPost: (urls: PostDetailRequest['urls']) => `/board/${urls.boardId}`,
  deletePost: (urls: PostDeleteRequest['urls']) => `/board/${urls.boardId}`,
  addBookmark: `/mypage/bookmark`,
  removeBookmark: (urls: RemoveBookmarkRequest['urls']) => `/mypage/bookmark/${urls.boardId}`,
} as const

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ body }: PostCreateRequest) => instance.post<PostId>(ENDPOINTS.createPost, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useEditPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ body, urls }: PostEditRequest) =>
      instance.patch<PostId>(ENDPOINTS.editPost(urls), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ urls }: PostDeleteRequest) =>
      instance.delete<string>(ENDPOINTS.deletePost(urls)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useAddBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ body }: AddBookmarkRequest) =>
      instance.post<string>(ENDPOINTS.addBookmark, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ urls }: RemoveBookmarkRequest) =>
      instance.delete<string>(ENDPOINTS.removeBookmark(urls)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
