import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { instance } from '@/app/api'
import { chatQueryKeys } from '@/entities/chat/api/useChat.query'
import type { ExitChatRoomRequest } from '@/entities/chat/model/chat.type'

export const useExitChatRoomMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<string, AxiosError<string>, ExitChatRoomRequest>({
    mutationFn: ({ urls }) => instance.delete(`/chat/list/exit/${urls.boardId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: chatQueryKeys.roomList }),
  })
}
