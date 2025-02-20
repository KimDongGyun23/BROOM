import type { MilitaryBranchCode } from '@/utils/constants'

// type User = {
//   userId: string
//   userNickname: string
//   militaryBranch: MilitaryBranchCode
// }

// type Message = {
//   messageId: number
//   message: string
//   senderNickname: string
//   createdAt: string
//   militaryBranch: MilitaryBranchCode
//   dischargeYear: number
// }

type BoardInformation = {
  boardId: string
  boardTitle: string
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

export type ChattingRoomInformationResponse = {
  chatRooms: ChatRoom[]
  hasNext: boolean
}

export type EnterChatRoomRequest = {
  urls: Pick<BoardInformation, 'boardId'>
}
