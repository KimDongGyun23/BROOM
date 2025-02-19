import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  CarpoolChattingIdRequest,
  CarpoolChattingIdResponse,
  CarpoolChattingListResponse,
  CarpoolChattingRoomRequest,
  CarpoolChattingRoomResponse,
  CarpoolExitChattingRoomRequest,
  ChattingListProfileType,
} from '@/types/chatting'

import { instance } from '.'

type ChattingRoomRequest = CarpoolChattingRoomRequest

const API_ENDPOINTS = {
  CHATTING_ID: (id: string) => `/chat/room/create/${id}`,
  ROOM_INFO: (id: string) => `/chat/list/${id}`,
  ROOM_LIST: `/chat/room/list`,
  EXIT: (id: string) => `/chat/room/list/${id}`,
} as const

const queryKeys = {
  all: ['chatting'] as const,
  roomList: () => [...queryKeys.all, 'chatting-list'] as const,
  roomInfo: (urls: ChattingRoomRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
}

export const useCarpoolChattingRoomList = () => {
  return useQuery<CarpoolChattingListResponse, Error, ChattingListProfileType[]>({
    queryKey: queryKeys.roomList(),
    queryFn: async () => await instance.get(API_ENDPOINTS.ROOM_LIST),
    gcTime: 0,
    staleTime: 0,
    select: (data) =>
      data.result.map((item) => ({
        id: item.chatRoomId,
        opponent: item.opponentNickname,
        title: item.carpoolBoardTitle,
        lastMessage: item.lastMessage,
        lastMessageDaysAgo: item.lastMessageDaysAgo,
        militaryChaplain: item.militaryChaplain,
        read: item.read,
      })),
  })
}

export const useCarpoolChattingInfo = ({ urls }: CarpoolChattingRoomRequest) => {
  return useQuery<CarpoolChattingRoomResponse, Error>({
    queryKey: queryKeys.roomInfo(urls),
    queryFn: async () => await instance.get(API_ENDPOINTS.ROOM_INFO(urls.chatRoomId)),
  })
}

export const useCarpoolChattingId = () => {
  return useMutation<CarpoolChattingIdResponse, Error, CarpoolChattingIdRequest>({
    mutationFn: async ({ urls }) =>
      await instance.post(API_ENDPOINTS.CHATTING_ID(urls.carpoolBoardId)),
  })
}

export const useCarpoolExitChattingRoom = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, CarpoolExitChattingRoomRequest>({
    mutationFn: async ({ urls }) => await instance.post(API_ENDPOINTS.EXIT(urls.chatRoomId)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.all }),
  })
}
