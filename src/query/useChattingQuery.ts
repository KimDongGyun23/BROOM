import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { ChatRoomInformationRequest, ChattingRoomInformationResponse } from '@/types/chat'
import type {
  CarpoolChattingIdRequest,
  CarpoolChattingIdResponse,
  CarpoolExitChattingRoomRequest,
} from '@/types/chatting'

import { instance } from '.'

const ENDPOINTS = {
  fetchRoomList: (pageParam: unknown) => `/chat/list?page=${pageParam}`,
  fetchRoomInfo: (urls: ChatRoomInformationRequest['urls']) => `/chat/room/enter/${urls.boardId}`,

  CHATTING_ID: (id: string) => `/chat/room/create/${id}`,
  ROOM_INFO: (id: string) => `/chat/list/${id}`,
  EXIT: (id: string) => `/chat/room/list/${id}`,
} as const

const queryKeys = {
  all: ['chatting'] as const,
  roomList: () => [...queryKeys.all, 'chatting-list'] as const,
  roomInfo: (urls: ChatRoomInformationRequest['urls']) =>
    [...queryKeys.all, 'chat-room', ...Object.values(urls)] as const,
}

export const useChattingRoomList = () => {
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

export const useFetchChatRoomInformation = ({ urls }: ChatRoomInformationRequest) =>
  useQuery({
    queryKey: queryKeys.roomInfo(urls),
    queryFn: () => instance.get<string>(ENDPOINTS.fetchRoomInfo(urls)),
    enabled: false,
  })

export const useCarpoolChattingId = () => {
  return useMutation<CarpoolChattingIdResponse, Error, CarpoolChattingIdRequest>({
    mutationFn: async ({ urls }) => await instance.post(ENDPOINTS.CHATTING_ID(urls.carpoolBoardId)),
  })
}

export const useCarpoolExitChattingRoom = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, CarpoolExitChattingRoomRequest>({
    mutationFn: async ({ urls }) => await instance.post(ENDPOINTS.EXIT(urls.chatRoomId)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.all }),
  })
}
