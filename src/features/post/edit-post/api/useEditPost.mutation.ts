import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { instance } from '@/app/api'
import { boardQueryKeys } from '@/entities/board/api/useBoard.query'
import type { EditPostRequest, PostId } from '@/entities/board/model/post.type'

export const useEditPostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<PostId, AxiosError<string>, EditPostRequest>({
    mutationFn: ({ body, urls }) => instance.patch(`/board/${urls.boardId}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardQueryKeys.all })
    },
  })
}
