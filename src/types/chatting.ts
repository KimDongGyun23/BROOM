import type { IconType } from './common'

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

type TeammateChattingRoomType = ChattingRoomType & {
  teamBoardTitle: string
  teamBoardId: string
}

export type MessageType = {
  senderName: string
  content: string
  createdAt: string
}

type ChattingType = {
  opponentNickname: string
  yearsSinceDischarge: number
  militaryChaplain: string
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
    militaryChaplain: IconType
    read: boolean
  }[]
}

export type ChattingListProfileType = {
  id: string
  opponent: string
  title: string
  lastMessage: string
  lastMessageDaysAgo: string
  militaryChaplain: IconType
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
  militaryChaplain: IconType
  previousMessages: MessageType[]
}

export type ChattingRoomProfileType = {
  opponent: string
  dischargeYear: string
  militaryChaplain: IconType
  title: string
}

export type CustomChattingRoomType = {
  profile: ChattingRoomProfileType
  previousMessages: MessageType[]
}

export type TeammateChattingListResponse = {
  result: {
    chatRoomId: string
    authorId: string
    participantId: string
    opponentNickname: string
    teamBoardTitle: string
    lastMessage: string
    lastMessageDaysAgo: string
    militaryChaplain: IconType
    read: boolean
  }[]
}

export type TeammateChattingIdRequest = {
  urls: Pick<TeammateChattingRoomType, 'teamBoardId'>
}
export type TeammateChattingIdResponse = Omit<TeammateChattingRoomType, 'teamBoardId'>

export type TeammateExitChattingRoomRequest = {
  urls: Pick<TeammateChattingRoomType, 'chatRoomId'>
}

export type TeammateChattingRoomRequest = {
  urls: Pick<ChattingRoomType, 'chatRoomId'>
}
export type TeammateChattingRoomResponse = ChattingType &
  Pick<TeammateChattingRoomType, 'teamBoardTitle'>

export type SendingMessageRequset = {
  chatRoomId: string
  content: string
  senderId: string
}
