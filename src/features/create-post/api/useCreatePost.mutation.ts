import { useMutation, useQueryClient } from '@tanstack/react-query'

import { instance } from '@/app/api'
import { boardQueryKeys } from '@/entities/board/api/useBoard.query'
import type { PostCreateRequest, PostId } from '@/entities/board/model/post.type'

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ body }: PostCreateRequest) => instance.post<PostId>('/board', body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardQueryKeys.all })
    },
  })
}
