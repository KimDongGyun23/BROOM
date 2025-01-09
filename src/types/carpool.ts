import type { PostAuthorType, PostSearchType } from './post'

type CarpoolPost = {
  carpoolBoardId: number
  title: string
  createdAt: string
  trainingDate: string
  departPlace: string
  departTime: string
  full: boolean
}

type CarpoolPostDetail = {
  personnel: number
  price: number
  content: string
}

export type CarpoolForm = Pick<CarpoolPost, 'title' | 'trainingDate' | 'departPlace'> &
  CarpoolPostDetail & {
    hour: number
    minute: number
  }

type Author = { author: PostAuthorType }
type CarpoolId = Pick<CarpoolPost, 'carpoolBoardId'>
type CarpoolFull = Pick<CarpoolPost, 'full'>
type CarpoolSendingForm = Omit<CarpoolForm, 'hour' | 'minute'> & Pick<CarpoolPost, 'departTime'>

export type CarpoolResponse = {
  result: CarpoolPost[]
}

export type CarpoolSearchRequest = {
  urls: PostSearchType
}
export type CarpoolSearchResponse = {
  result: CarpoolPost[]
}

export type CarpoolRecruitResponse = {
  result: CarpoolPost[]
}

export type CarpoolDetailRequest = {
  urls: CarpoolId
}
export type CarpoolDetailResponse = CarpoolPost & CarpoolPostDetail & Author

export type CarpoolCreateRequest = {
  body: CarpoolSendingForm
}
export type CarpoolCreateResponse = CarpoolId

export type CarpoolEditPageRequest = {
  urls: CarpoolId
}

export type CarpoolEditRequest = {
  body: CarpoolSendingForm
  urls: CarpoolId
}
export type CarpoolEditResponse = Omit<CarpoolPost, 'createdAt' | 'full'> & CarpoolPostDetail

export type CarpoolDeleteRequest = {
  urls: CarpoolId
}

export type CarpoolIsFullRequest = {
  body: CarpoolFull
  urls: CarpoolId
}
