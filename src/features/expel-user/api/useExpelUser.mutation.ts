import { useMutation, useQueryClient } from '@tanstack/react-query'

import { instance } from '@/app/api'
import { chatQueryKeys } from '@/entities/chat/api/useChat.query'
import type { ExpelUserRequest } from '@/entities/chat/model/chat.type'

export const useExpelUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ body }: ExpelUserRequest) =>
      instance.patch<string>(`/chat/list/expell/request`, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: chatQueryKeys.all }),
  })
}
