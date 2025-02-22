import type { MilitaryBranchCode } from '@/utils/constants'

export type User = {
  userId: string
  userNickname: string
  militaryBranch: MilitaryBranchCode
}

type Message = {
  messageId: number
  message: string
  senderNickname: string
  createdAt: string
  militaryBranch: MilitaryBranchCode
  dischargeYear: number
}

type BoardInformation = {
  boardTitle: string
  ownerNickname: string
  militaryBranches: MilitaryBranchCode[]
}

export type ChatRoom = {
  boardId: string
  boardName: string
  lastMessage: string
  lastMessageTime: string
  militaryBranches: MilitaryBranchCode[]
  expelled: boolean
}

export type ChatRoomListResponse = {
  chatRooms: ChatRoom[]
  hasNext: boolean
}

export type ChatRoomInformationRequest = {
  urls: Pick<ChatRoom, 'boardId'> & {
    pageParam?: number
  }
}
export type ChatRoomInformationResponse = BoardInformation & {
  messages: Message[]
  hasNext: boolean
}

export type ChatSidebarInformationRequest = {
  urls: Pick<ChatRoom, 'boardId'>
}
export type ChatSidebarInformationResponse = Pick<BoardInformation, 'boardTitle'> & {
  trainingDate: string
  author: User
  participants: User[]
}

export type EnterChatRoomRequest = {
  urls: Pick<ChatRoom, 'boardId'>
}

export type ExitChatRoomRequest = {
  urls: Pick<ChatRoom, 'boardId'>
}

export type ExpelUserRequest = {
  body: Pick<ChatRoom, 'boardId'> & {
    expellId: string
  }
}
