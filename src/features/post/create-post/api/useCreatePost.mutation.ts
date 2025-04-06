import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { instance } from '@/app/api'
import { boardQueryKeys } from '@/entities/board/api/useBoard.query'
import type { CreatePostRequest, PostId } from '@/entities/board/model/post.type'

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<PostId, AxiosError<string>, CreatePostRequest>({
    mutationFn: ({ body }) => instance.post('/board', body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardQueryKeys.all })
    },
  })
}
