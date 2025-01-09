import type { PostAuthorType, PostSearchType } from './post'

type TeamPost = {
  teamBoardId: number
  title: string
  createdAt: string
  trainingDate: string
  meetingPlace: string
  meetingTime: string
  full: boolean
}

type TeamPostDetail = {
  personnel: number
  content: string
}

export type TeamForm = Pick<TeamPost, 'title' | 'trainingDate' | 'meetingPlace'> &
  TeamPostDetail & {
    hour: number
    minute: number
  }

type Author = { author: PostAuthorType }
type TeamId = Pick<TeamPost, 'teamBoardId'>
type TeamFull = Pick<TeamPost, 'full'>
type TeamSendingForm = Omit<TeamForm, 'hour' | 'minute'> & Pick<TeamPost, 'meetingTime'>

export type TeamResponse = {
  result: TeamPost[]
}

export type TeamSearchRequest = {
  urls: PostSearchType
}
export type TeamSearchResponse = {
  result: TeamPost[]
}

export type TeamRecruitResponse = {
  result: TeamPost[]
}

export type TeamDetailRequest = {
  urls: TeamId
}

export type TeamDetailResponse = TeamPost & TeamPostDetail & Author

export type TeamCreateRequest = {
  body: TeamSendingForm
}
export type TeamCreateResponse = TeamId

export type TeamEditPageRequest = {
  urls: TeamId
}

export type TeamEditRequest = {
  body: TeamSendingForm
  urls: TeamId
}
export type TeamEditResponse = Omit<TeamPost, 'createdAt' | 'full'> & TeamPostDetail

export type TeamDeleteRequest = {
  urls: TeamId
}

export type TeamIsFullRequest = {
  body: TeamFull
  urls: TeamId
}
