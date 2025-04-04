import { useQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { instance } from '@/app/api'
import type {
  ChatRoomInformationRequest,
  ChatRoomInformationResponse,
  ChatRoomListResponse,
  ChatSidebarInformationRequest,
  ChatSidebarInformationResponse,
  EnterChatRoomRequest,
} from '@/entities/chat/model/chat.type'

export const chatQueryKeys = {
  all: ['chat'] as const,
  roomList: () => [...chatQueryKeys.all, 'list'] as const,
  roomInformation: (urls: ChatRoomInformationRequest['urls']) =>
    [...chatQueryKeys.all, 'room-information', ...Object.values(urls)] as const,
  sidebarInformation: (urls: ChatSidebarInformationRequest['urls']) =>
    [...chatQueryKeys.all, 'sidebar-information', ...Object.values(urls)] as const,
  enterRoom: (urls: EnterChatRoomRequest['urls']) =>
    [...chatQueryKeys.all, 'enter-room', ...Object.values(urls)] as const,
}

export const useFetchChatRoomList = () =>
  useSuspenseInfiniteQuery({
    queryKey: chatQueryKeys.roomList(),
    queryFn: ({ pageParam = 0 }) =>
      instance.get<ChatRoomListResponse>(`/chat/list?page=${pageParam}`),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.hasNext ? allPages.length : undefined),
  })

export const useFetchChatRoomInformation = ({ urls }: ChatRoomInformationRequest) =>
  useSuspenseInfiniteQuery({
    queryKey: chatQueryKeys.roomInformation(urls),
    queryFn: ({ pageParam = 0 }) =>
      instance.get<ChatRoomInformationResponse>(`/chat/room/${urls.boardId}?page=${pageParam}`),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.hasNext ? allPages.length : undefined),
    select: (data) => {
      if (!data.pages[0]) return null
      const { boardTitle, ownerNickname, militaryBranches } = data.pages[0]

      return {
        boardTitle,
        ownerNickname,
        militaryBranches,
        messages: data.pages.flatMap((page) => page.messages) || [],
      }
    },
  })

export const useFetchChatSidebarInformation = ({ urls }: ChatSidebarInformationRequest) =>
  useQuery({
    queryKey: chatQueryKeys.sidebarInformation(urls),
    queryFn: () =>
      instance.get<ChatSidebarInformationResponse>(`/chat/list/participant/${urls.boardId}`),
    enabled: false,
  })

export const useFetchEnteredChatRoom = ({ urls }: EnterChatRoomRequest) =>
  useQuery<string, AxiosError<string>>({
    queryKey: chatQueryKeys.enterRoom(urls),
    queryFn: () => instance.get(`/chat/room/enter/${urls.boardId}`),
    enabled: false,
  })
