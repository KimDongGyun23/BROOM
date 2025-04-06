import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { instance } from '@/app/api'
import { boardQueryKeys } from '@/entities/board/api/useBoard.query'
import type { DeletePostRequest } from '@/entities/board/model/post.type'

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<string, AxiosError<string>, DeletePostRequest>({
    mutationFn: ({ urls }) => instance.delete(`/board/${urls.boardId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardQueryKeys.all })
    },
  })
}
