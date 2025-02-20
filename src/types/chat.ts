import type { MilitaryBranchCode } from '@/utils/constants'

// type User = {
//   userId: string
//   userNickname: string
//   militaryBranch: MilitaryBranchCode
// }

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

export type EnterChatRoomRequest = {
  urls: Pick<ChatRoom, 'boardId'>
}
