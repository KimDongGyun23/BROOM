import { useMutation, useQueryClient } from '@tanstack/react-query'

import { instance } from '@/app/api'
import { boardQueryKeys } from '@/entities/board/api/useBoard.query'
import type { AddBookmarkRequest, RemoveBookmarkRequest } from '@/entities/board/model/post.type'

export const useAddBookmarkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ body }: AddBookmarkRequest) => instance.post<string>('/mypage/bookmark', body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardQueryKeys.all })
    },
  })
}

export const useDeleteBookmarkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ urls }: RemoveBookmarkRequest) =>
      instance.delete<string>(`/mypage/bookmark/${urls.boardId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardQueryKeys.all })
    },
  })
}
