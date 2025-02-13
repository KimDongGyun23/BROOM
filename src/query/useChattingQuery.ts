import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  CarpoolChattingIdRequest,
  CarpoolChattingIdResponse,
  CarpoolChattingListResponse,
  CarpoolChattingRoomRequest,
  CarpoolChattingRoomResponse,
  CarpoolExitChattingRoomRequest,
  ChattingListProfileType,
  TeamChattingRoomRequest,
} from '@/types/chatting'

import { instance } from '.'

const POST_PAGES = ['carpool'] as const
type PostPageType = (typeof POST_PAGES)[number]

type ChattingRoomRequest<T extends PostPageType> = T extends 'carpool'
  ? CarpoolChattingRoomRequest
  : TeamChattingRoomRequest

const API_ENDPOINTS = {
  CHATTING_ID: (currentPage: PostPageType, id: string) => `/${currentPage}/chat/room/create/${id}`,
  ROOM_INFO: (currentPage: PostPageType, id: string) => `/${currentPage}/chat/list/${id}`,
  ROOM_LIST: (currentPage: PostPageType) => `/${currentPage}/chat/room/list`,
  EXIT: (currentPage: PostPageType, id: string) => `/${currentPage}/chat/room/list/${id}`,
} as const

const queryKeys = {
  all: ['chatting'] as const,
  roomList: (currentPage: PostPageType) =>
    [...queryKeys.all, currentPage, 'chatting-list'] as const,
  roomInfo: <T extends PostPageType>(currentPage: T, urls: ChattingRoomRequest<T>['urls']) =>
    [...queryKeys.all, currentPage, ...Object.values(urls)] as const,
}

export const useCarpoolChattingRoomList = () => {
  const currentPage = POST_PAGES[0]

  return useQuery<CarpoolChattingListResponse, Error, ChattingListProfileType[]>({
    queryKey: queryKeys.roomList(currentPage),
    queryFn: async () => await instance.get(API_ENDPOINTS.ROOM_LIST(currentPage)),
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
  const currentPage = POST_PAGES[0]

  return useQuery<CarpoolChattingRoomResponse, Error>({
    queryKey: queryKeys.roomInfo(currentPage, urls),
    queryFn: async () => await instance.get(API_ENDPOINTS.ROOM_INFO(currentPage, urls.chatRoomId)),
  })
}

export const useCarpoolChattingId = () => {
  const currentPage = POST_PAGES[0]

  return useMutation<CarpoolChattingIdResponse, Error, CarpoolChattingIdRequest>({
    mutationFn: async ({ urls }) =>
      await instance.post(API_ENDPOINTS.CHATTING_ID(currentPage, urls.carpoolBoardId)),
  })
}

export const useCarpoolExitChattingRoom = () => {
  const currentPage = POST_PAGES[0]
  const queryClient = useQueryClient()

  return useMutation<void, Error, CarpoolExitChattingRoomRequest>({
    mutationFn: async ({ urls }) =>
      await instance.post(API_ENDPOINTS.EXIT(currentPage, urls.chatRoomId)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.all }),
  })
}
