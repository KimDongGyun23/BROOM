import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { PostDetailRequest, PostEditRequest, PostId } from '@/entities/board/model/post.type'

import { instance } from '../../../app/api'

import { boardQueryKeys } from './useBoard.query'

const ENDPOINTS = {
  editPost: (urls: PostDetailRequest['urls']) => `/board/${urls.boardId}`,
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
