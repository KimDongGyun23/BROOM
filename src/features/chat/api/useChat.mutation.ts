import { useMutation, useQueryClient } from '@tanstack/react-query'

import { instance } from '@/app/api'
import type { ExitChatRoomRequest, ExpelUserRequest } from '@/features/chat/model/chat.type'

import { queryKeys } from './useChat.query'

const ENDPOINTS = {
  exitRoom: (urls: ExitChatRoomRequest['urls']) => `/chat/list/exit/${urls.boardId}`,
  expelUser: `/chat/list/expell/request`,
} as const

export const useExitChatRoom = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ urls }: ExitChatRoomRequest) =>
      instance.delete<string>(ENDPOINTS.exitRoom(urls)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.roomList }),
  })
}

export const useExpelUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ body }: ExpelUserRequest) => instance.patch<string>(ENDPOINTS.expelUser, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.all }),
  })
}
