import type { PostAuthorType, PostSearchType } from './post'

type TeamPostBasicInfo = {
  title: string
  trainingDate: string
  meetingPlace: string
  meetingTime: string
}

type TeamPostMetadata = {
  createdAt: string
  teamBoardId: number
  full: boolean
}

type TeamPostDetail = {
  personnel: number
  content: string
}

type Form = Omit<TeamPostBasicInfo, 'meetingTime'> & {
  hour: number
  minute: number
}

type Author = { author: PostAuthorType }
type TeamPostSummary = TeamPostBasicInfo & TeamPostMetadata

export type TeamPostContent = TeamPostBasicInfo & TeamPostDetail
export type TeamId = Pick<TeamPostSummary, 'teamBoardId'>
export type TeamForm = Form & TeamPostDetail

export type TeamResponse = {
  result: TeamPostSummary[]
}

export type TeamSearchRequest = {
  urls: PostSearchType
}
export type TeamSearchResponse = {
  result: TeamPostSummary[]
}

export type TeamRecruitResponse = {
  result: TeamPostSummary[]
}

export type TeamDetailRequest = {
  urls: TeamId
}

export type TeamDetailResponse = TeamPostBasicInfo & TeamPostMetadata & TeamPostDetail & Author

export type TeamCreateRequest = {
  body: TeamPostContent
}

export type TeamEditPageRequest = {
  urls: TeamId
}

export type TeamEditRequest = {
  body: TeamPostContent
  urls: TeamId
}

export type TeamDeleteRequest = {
  urls: TeamId
}

export type TeamIsFullRequest = {
  body: Pick<TeamPostMetadata, 'full'>
  urls: TeamId
}
