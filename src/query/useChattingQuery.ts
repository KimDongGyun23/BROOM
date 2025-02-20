import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  ChatRoomInformationRequest,
  ChatRoomInformationResponse,
  ChatRoomListResponse,
  EnterChatRoomRequest,
} from '@/types/chat'
import type { CarpoolExitChattingRoomRequest } from '@/types/chatting'

import { instance } from '.'

const ENDPOINTS = {
  fetchRoomList: (pageParam: unknown) => `/chat/list?page=${pageParam}`,
  fetchRoomInformation: (urls: ChatRoomInformationRequest['urls']) =>
    `/chat/room/${urls.boardId}?page=${urls.pageParam}`,
  enterRoom: (urls: EnterChatRoomRequest['urls']) => `/chat/room/enter/${urls.boardId}`,

  EXIT: (id: string) => `/chat/room/list/${id}`,
} as const

const queryKeys = {
  all: ['chat'] as const,
  roomList: () => [...queryKeys.all, 'list'] as const,
  roomInformation: (urls: ChatRoomInformationRequest['urls']) =>
    [...queryKeys.all, 'room-information', ...Object.values(urls)] as const,
  enterRoom: (urls: EnterChatRoomRequest['urls']) =>
    [...queryKeys.all, 'enter-room', ...Object.values(urls)] as const,
}

export const useFetchChatRoomList = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.roomList(),
    queryFn: ({ pageParam = 0 }) =>
      instance.get<ChatRoomListResponse>(ENDPOINTS.fetchRoomList(pageParam)),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined
    },
  })
}

export const useFetchChatRoomInformation = ({ urls }: ChatRoomInformationRequest) => {
  return useInfiniteQuery({
    queryKey: queryKeys.roomInformation(urls),
    queryFn: ({ pageParam = 0 }) =>
      instance.get<ChatRoomInformationResponse>(
        ENDPOINTS.fetchRoomInformation({ ...urls, pageParam }),
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined
    },
    select: (data) => {
      const { boardTitle, ownerNickname, militaryBranches } = data.pages[0] || {}

      return {
        boardTitle,
        ownerNickname,
        militaryBranches,
        messages: data.pages.flatMap((page) => page.messages) || [],
      }
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
