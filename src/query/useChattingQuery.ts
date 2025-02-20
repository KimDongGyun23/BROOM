import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { ChattingRoomInformationResponse, EnterChatRoomRequest } from '@/types/chat'
import type { CarpoolExitChattingRoomRequest } from '@/types/chatting'

import { instance } from '.'

const ENDPOINTS = {
  fetchRoomList: (pageParam: unknown) => `/chat/list?page=${pageParam}`,
  enterRoom: (urls: EnterChatRoomRequest['urls']) => `/chat/room/enter/${urls.boardId}`,

  CHATTING_ID: (id: string) => `/chat/room/create/${id}`,
  ROOM_INFO: (id: string) => `/chat/list/${id}`,
  EXIT: (id: string) => `/chat/room/list/${id}`,
} as const

const queryKeys = {
  all: ['chatting'] as const,
  roomList: () => [...queryKeys.all, 'chatting-list'] as const,
  enterRoom: (urls: EnterChatRoomRequest['urls']) =>
    [...queryKeys.all, 'chat-room', ...Object.values(urls)] as const,
}

export const useFetchChatRoomList = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.roomList(),
    queryFn: ({ pageParam = 0 }: { pageParam: unknown }) =>
      instance.get<ChattingRoomInformationResponse>(ENDPOINTS.fetchRoomList(pageParam)),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined
    },
  })
}

export const useEnterChatRoom = ({ urls }: EnterChatRoomRequest) =>
  useQuery({
    queryKey: queryKeys.enterRoom(urls),
    queryFn: () => instance.get<string>(ENDPOINTS.enterRoom(urls)),
    enabled: false,
  })

export const useCarpoolExitChattingRoom = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, CarpoolExitChattingRoomRequest>({
    mutationFn: async ({ urls }) => await instance.post(ENDPOINTS.EXIT(urls.chatRoomId)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.all }),
  })
}
