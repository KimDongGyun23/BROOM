import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { ChattingRoomInformationResponse } from '@/types/chat'
import type {
  CarpoolChattingIdRequest,
  CarpoolChattingIdResponse,
  CarpoolChattingRoomRequest,
  CarpoolChattingRoomResponse,
  CarpoolExitChattingRoomRequest,
} from '@/types/chatting'

import { instance } from '.'

type ChattingRoomRequest = CarpoolChattingRoomRequest

const ENDPOINTS = {
  fetchRoomList: (pageParam: unknown) => `/chat/list?page=${pageParam}`,

  CHATTING_ID: (id: string) => `/chat/room/create/${id}`,
  ROOM_INFO: (id: string) => `/chat/list/${id}`,
  EXIT: (id: string) => `/chat/room/list/${id}`,
} as const

const queryKeys = {
  all: ['chatting'] as const,
  roomList: () => [...queryKeys.all, 'chatting-list'] as const,
  roomInfo: (urls: ChattingRoomRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
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

export const useCarpoolChattingInfo = ({ urls }: CarpoolChattingRoomRequest) => {
  return useQuery<CarpoolChattingRoomResponse, Error>({
    queryKey: queryKeys.roomInfo(urls),
    queryFn: async () => await instance.get(ENDPOINTS.ROOM_INFO(urls.chatRoomId)),
  })
}

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
