import type { PostAuthorType, PostSearchType } from './post'

type CarpoolPostBasicInfo = {
  title: string
  trainingDate: string
  departPlace: string
  departTime: string
}

type CarpoolPostMetadata = {
  createdAt: string
  carpoolBoardId: number
  full: boolean
}

type CarpoolPostDetail = {
  personnel: number
  content: string
  price: number
}

type Form = Omit<CarpoolPostBasicInfo, 'departTime'> & {
  hour: number
  minute: number
}

type Author = { author: PostAuthorType }
type CarpoolPostSummary = CarpoolPostBasicInfo & CarpoolPostMetadata

export type CarpoolPostContent = CarpoolPostBasicInfo & CarpoolPostDetail
export type CarpoolId = Pick<CarpoolPostMetadata, 'carpoolBoardId'>
export type CarpoolForm = Form & CarpoolPostDetail

export type CarpoolResponse = {
  result: CarpoolPostSummary[]
}

export type CarpoolSearchRequest = {
  urls: PostSearchType
}
export type CarpoolSearchResponse = {
  result: CarpoolPostSummary[]
}

export type CarpoolRecruitResponse = {
  result: CarpoolPostSummary[]
}

export type CarpoolDetailRequest = {
  urls: CarpoolId
}
export type CarpoolDetailResponse = CarpoolPostBasicInfo &
  CarpoolPostMetadata &
  CarpoolPostDetail &
  Author

export type CarpoolCreateRequest = {
  body: CarpoolPostContent
}

export type CarpoolEditPageRequest = {
  urls: CarpoolId
}

export type CarpoolEditRequest = {
  body: CarpoolPostContent
  urls: CarpoolId
}

export type CarpoolDeleteRequest = {
  urls: CarpoolId
}

export type CarpoolIsFullRequest = {
  body: Pick<CarpoolPostMetadata, 'full'>
  urls: CarpoolId
}
