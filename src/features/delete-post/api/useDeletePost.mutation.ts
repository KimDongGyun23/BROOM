import { useMutation, useQueryClient } from '@tanstack/react-query'

import { instance } from '@/app/api'
import { boardQueryKeys } from '@/entities/board/api/useBoard.query'
import type { PostDeleteRequest } from '@/entities/board/model/post.type'

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ urls }: PostDeleteRequest) => instance.delete<string>(`/board/${urls.boardId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardQueryKeys.all })
    },
  })
}
