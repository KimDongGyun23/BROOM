import { useMutation, useQueryClient } from '@tanstack/react-query'

import { instance } from '@/app/api'
import { chatQueryKeys } from '@/entities/chat/api/useChat.query'
import type { ExitChatRoomRequest } from '@/entities/chat/model/chat.type'

export const useExitChatRoomMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ urls }: ExitChatRoomRequest) =>
      instance.delete<string>(`/chat/list/exit/${urls.boardId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: chatQueryKeys.roomList }),
  })
}
