import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { instance } from '@/app/api'
import type {
  ChatRoomInformationRequest,
  ChatRoomInformationResponse,
  ChatRoomListResponse,
  ChatSidebarInformationRequest,
  ChatSidebarInformationResponse,
  EnterChatRoomRequest,
} from '@/entities/chat/model/chat.type'

const ENDPOINTS = {
  fetchRoomList: (pageParam: unknown) => `/chat/list?page=${pageParam}`,
  fetchRoomInformation: (urls: ChatRoomInformationRequest['urls']) =>
    `/chat/room/${urls.boardId}?page=${urls.pageParam}`,
  fetchSidebarInformation: (urls: ChatSidebarInformationRequest['urls']) =>
    `/chat/list/participant/${urls.boardId}`,
  enterRoom: (urls: EnterChatRoomRequest['urls']) => `/chat/room/enter/${urls.boardId}`,
} as const

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
  useInfiniteQuery({
    queryKey: chatQueryKeys.roomList(),
    queryFn: ({ pageParam = 0 }) =>
      instance.get<ChatRoomListResponse>(ENDPOINTS.fetchRoomList(pageParam)),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined
    },
  })

export const useFetchChatRoomInformation = ({ urls }: ChatRoomInformationRequest) =>
  useInfiniteQuery({
    queryKey: chatQueryKeys.roomInformation(urls),
    queryFn: ({ pageParam = 0 }) =>
      instance.get<ChatRoomInformationResponse>(
        ENDPOINTS.fetchRoomInformation({ ...urls, pageParam }),
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined
    },
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
      instance.get<ChatSidebarInformationResponse>(ENDPOINTS.fetchSidebarInformation(urls)),
    enabled: false,
  })

export const useFetchEnteredChatRoom = ({ urls }: EnterChatRoomRequest) =>
  useQuery({
    queryKey: chatQueryKeys.enterRoom(urls),
    queryFn: () => instance.get<string>(ENDPOINTS.enterRoom(urls)),
    enabled: false,
  })
