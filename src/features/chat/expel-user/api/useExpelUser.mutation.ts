import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { instance } from '@/app/api'
import { chatQueryKeys } from '@/entities/chat/api/useChat.query'
import type { ExpelUserRequest } from '@/entities/chat/model/chat.type'

export const useExpelUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<string, AxiosError<string>, ExpelUserRequest>({
    mutationFn: ({ body }) => instance.patch(`/chat/list/expell/request`, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: chatQueryKeys.all }),
  })
}
