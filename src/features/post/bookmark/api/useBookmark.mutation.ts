import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { instance } from '@/app/api'
import { boardQueryKeys } from '@/entities/board/api/useBoard.query'
import type { AddBookmarkRequest, RemoveBookmarkRequest } from '@/entities/board/model/post.type'

export const useAddBookmarkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<string, AxiosError<string>, AddBookmarkRequest>({
    mutationFn: ({ body }) => instance.post('/mypage/bookmark', body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: boardQueryKeys.all }),
  })
}

export const useDeleteBookmarkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<string, AxiosError<string>, RemoveBookmarkRequest>({
    mutationFn: ({ urls }) => instance.delete(`/mypage/bookmark/${urls.boardId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: boardQueryKeys.all }),
  })
}
