import type { MilitaryBranchCode } from '@/utils/constants'

type ChattingRoomType = {
  chatRoomId: string
  authorId: string
  participantId: string
  opponentNickname: string
  lastMessage: string
  lastMessageDaysAgo: number
  read: boolean
}

type CarpoolChattingRoomType = ChattingRoomType & {
  carpoolBoardTitle: string
  carpoolBoardId: string
}

type TeamChattingRoomType = ChattingRoomType & {
  teamBoardTitle: string
  teamBoardId: string
}

export type MessageType = {
  messageId: number
  message: string
  senderNickname: string
  createdAt: string
  militaryBranch: MilitaryBranchCode
  dischargeYear: number
}

type ChattingType = {
  opponentNickname: string
  yearsSinceDischarge: number
  militaryChaplain: MilitaryBranchCode
  previousMessages: MessageType[]
}

export type CarpoolChattingListResponse = {
  result: {
    chatRoomId: string
    authorId: string
    participantId: string
    opponentNickname: string
    carpoolBoardTitle: string
    lastMessage: string
    lastMessageDaysAgo: string
    militaryChaplain: MilitaryBranchCode
    read: boolean
  }[]
}

export type ChattingListProfileType = {
  id: string
  opponent: string
  title: string
  lastMessage: string
  lastMessageDaysAgo: string
  militaryChaplain: MilitaryBranchCode
  read: boolean
}

export type CarpoolChattingIdRequest = {
  urls: Pick<CarpoolChattingRoomType, 'carpoolBoardId'>
}
export type CarpoolChattingIdResponse = Omit<CarpoolChattingRoomType, 'carpoolBoardId'>

export type CarpoolExitChattingRoomRequest = {
  urls: Pick<CarpoolChattingRoomType, 'chatRoomId'>
}

export type CarpoolChattingRoomRequest = {
  urls: Pick<ChattingRoomType, 'chatRoomId'>
}
export type CarpoolChattingRoomResponse = {
  carpoolBoardTitle: string
  opponentNickname: string
  yearsSinceDischarge: number
  militaryChaplain: MilitaryBranchCode
  previousMessages: MessageType[]
}

export type ChattingRoomProfileType = {
  opponent: string
  dischargeYear: string
  iconType: MilitaryBranchCode
  title: string
}

export type TeamChattingListResponse = {
  result: {
    chatRoomId: string
    authorId: string
    participantId: string
    opponentNickname: string
    teamBoardTitle: string
    lastMessage: string
    lastMessageDaysAgo: string
    militaryChaplain: MilitaryBranchCode
    read: boolean
  }[]
}

export type TeamChattingIdRequest = {
  urls: Pick<TeamChattingRoomType, 'teamBoardId'>
}
export type TeamChattingIdResponse = Omit<TeamChattingRoomType, 'teamBoardId'>

export type TeamExitChattingRoomRequest = {
  urls: Pick<TeamChattingRoomType, 'chatRoomId'>
}

export type TeamChattingRoomRequest = {
  urls: Pick<ChattingRoomType, 'chatRoomId'>
}
export type TeamChattingRoomResponse = ChattingType & Pick<TeamChattingRoomType, 'teamBoardTitle'>

export type SendingMessageRequset = {
  chatRoomId: string
  content: string
  senderId: string
}
