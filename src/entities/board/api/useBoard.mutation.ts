import { useMutation, useQueryClient } from '@tanstack/react-query'

import type {
  AddBookmarkRequest,
  PostDetailRequest,
  PostEditRequest,
  PostId,
  RemoveBookmarkRequest,
} from '@/entities/board/model/post.type'

import { instance } from '../../../app/api'

import { boardQueryKeys } from './useBoard.query'

const ENDPOINTS = {
  editPost: (urls: PostDetailRequest['urls']) => `/board/${urls.boardId}`,
  addBookmark: `/mypage/bookmark`,
  removeBookmark: (urls: RemoveBookmarkRequest['urls']) => `/mypage/bookmark/${urls.boardId}`,
} as const

export const useEditPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ body, urls }: PostEditRequest) =>
      instance.patch<PostId>(ENDPOINTS.editPost(urls), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardQueryKeys.all })
    },
  })
}

export const useAddBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ body }: AddBookmarkRequest) =>
      instance.post<string>(ENDPOINTS.addBookmark, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardQueryKeys.all })
    },
  })
}

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ urls }: RemoveBookmarkRequest) =>
      instance.delete<string>(ENDPOINTS.removeBookmark(urls)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardQueryKeys.all })
    },
  })
}
