import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { api } from '@/queries'
import type {
  CarpoolChattingIdRequest,
  CarpoolChattingIdResponse,
  CarpoolChattingListResponse,
  CarpoolChattingRoomRequest,
  CarpoolChattingRoomResponse,
  CarpoolExitChattingRoomRequest,
  TeammateChattingIdRequest,
  TeammateChattingIdResponse,
  TeammateChattingListResponse,
  TeammateChattingRoomRequest,
  TeammateChattingRoomResponse,
  TeammateExitChattingRoomRequest,
} from '@/types'

const POST_PAGES = ['carpool', 'teammate'] as const
type PostPageType = (typeof POST_PAGES)[number]

type ChattingRoomRequest<T extends PostPageType> = T extends 'carpool'
  ? CarpoolChattingRoomRequest
  : TeammateChattingRoomRequest

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

  return useQuery<CarpoolChattingListResponse, Error>({
    queryKey: queryKeys.roomList(currentPage),
    queryFn: async () => await api.get(API_ENDPOINTS.ROOM_LIST(currentPage)),
    gcTime: 0,
    staleTime: 0,
  })
}

export const useTeammateChattingRoomList = () => {
  const currentPage = POST_PAGES[1]

  return useQuery<TeammateChattingListResponse, Error>({
    queryKey: queryKeys.roomList(currentPage),
    queryFn: async () => await api.get(API_ENDPOINTS.ROOM_LIST(currentPage)),
    gcTime: 0,
    staleTime: 0,
  })
}

// export const useCarpoolChattingRoomInfo = ({ urls }: CarpoolChattingRoomRequest) => {
export const useCarpoolChattingRoom = ({ urls }: CarpoolChattingRoomRequest) => {
  const currentPage = POST_PAGES[0]

  return useQuery<CarpoolChattingRoomResponse, Error>({
    queryKey: queryKeys.roomInfo(currentPage, urls),
    queryFn: async () => await api.get(API_ENDPOINTS.ROOM_INFO(currentPage, urls.chatRoomId)),
  })
}

// export const useTeammateChattingRoomInfo = ({ urls }: TeammateChattingRoomRequest) => {
export const useTeammateChattingRoom = ({ urls }: TeammateChattingRoomRequest) => {
  const currentPage = POST_PAGES[1]

  return useQuery<TeammateChattingRoomResponse, Error, TeammateChattingRoomRequest>({
    queryKey: queryKeys.roomInfo(currentPage, urls),
    queryFn: async () => await api.get(API_ENDPOINTS.ROOM_INFO(currentPage, urls.chatRoomId)),
  })
}

export const useCarpoolChattingId = () => {
  const currentPage = POST_PAGES[0]

  return useMutation<CarpoolChattingIdResponse, Error, CarpoolChattingIdRequest>({
    mutationFn: async ({ urls }) =>
      await api.post(API_ENDPOINTS.CHATTING_ID(currentPage, urls.carpoolBoardId)),
  })
}

export const useTeammateChattingId = () => {
  const currentPage = POST_PAGES[1]

  return useMutation<TeammateChattingIdResponse, Error, TeammateChattingIdRequest>({
    mutationFn: async ({ urls }) =>
      await api.post(API_ENDPOINTS.CHATTING_ID(currentPage, urls.teamBoardId)),
  })
}

export const useCarpoolExitChattingRoom = () => {
  const currentPage = POST_PAGES[0]
  const queryClient = useQueryClient()

  return useMutation<void, Error, CarpoolExitChattingRoomRequest>({
    mutationFn: async ({ urls }) =>
      await api.post(API_ENDPOINTS.EXIT(currentPage, urls.chatRoomId)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.all }),
  })
}

export const useTeammateExitChattingRoom = () => {
  const currentPage = POST_PAGES[1]
  const queryClient = useQueryClient()

  return useMutation<void, Error, TeammateExitChattingRoomRequest>({
    mutationFn: async ({ urls }) =>
      await api.post(API_ENDPOINTS.EXIT(currentPage, urls.chatRoomId)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.all }),
  })
}
