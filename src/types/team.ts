import type { PostAuthorType } from './post'

type TeamType = {
  teamBoardId: number
  title: string
  createdAt: string
  trainingDate: string
  meetingPlace: string
  meetingTime: string
  full: boolean
}

type TeamSearchType = {
  category: string
  keyword: string
}

type TeamDetailType = {
  personnel: number
  content: string
}

export type TeamFormType = Pick<TeamType, 'title' | 'trainingDate' | 'meetingPlace'> &
  TeamDetailType & { hour: number; minute: number }

export type TeamResponse = {
  result: TeamType[]
}

export type TeamSearchRequest = {
  urls: TeamSearchType
}
export type TeamSearchResponse = {
  result: TeamType[]
}

export type TeamRecruitResponse = {
  result: TeamType[]
}

export type TeamDetailRequest = {
  urls: Pick<TeamType, 'teamBoardId'>
}
export type TeamDetailResponse = {
  teamBoardId: number
  author: PostAuthorType
  title: string
  createdAt: string
  trainingDate: string
  meetingPlace: string
  meetingTime: string
  personnel: number
  content: string
  full: boolean
}

export type TeamCreateRequest = {
  body: Pick<TeamType, 'title' | 'trainingDate' | 'meetingPlace'> & TeamDetailType
}
export type TeamCreateResponse = Pick<TeamType, 'teamBoardId'>

export type TeamEditPageRequest = {
  urls: Pick<TeamType, 'teamBoardId'>
}

export type TeamEditRequest = {
  body: Omit<TeamDetailType, 'createdAt'>
  urls: Pick<TeamType, 'teamBoardId'>
}
export type TeamEditResponse = Omit<TeamType, 'createdAt' | 'full'> & TeamDetailType

export type TeamDeleteRequest = {
  urls: Pick<TeamType, 'teamBoardId'>
}

export type TeamIsFullRequest = {
  body: Pick<TeamType, 'full'>
  urls: Pick<TeamType, 'teamBoardId'>
}
