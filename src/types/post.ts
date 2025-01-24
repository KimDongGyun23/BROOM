import type { MilitaryBranchCode } from '@/utils/constants'

export type PostItemType = {
  boardId: number
  title: string
  createdAt: string
  trainingDate: string
  place: string
  time: string
  full: boolean
}

export type PostAuthorType = {
  userId: string
  nickname: string
  dischargeYear: number
  militaryChaplain: MilitaryBranchCode
  createdAt: string
}

export type PostDetailType = PostItemType & {
  personnel: number
  content: string
}

export type CustomPostDetailType = {
  profile: PostAuthorType
  item: PostDetailType
}

export type PostSearchType = {
  category: string
  keyword: string
}

//////////////////////////////////////

type PostBasicInfo = {
  title: string
  trainingDate: string
  place: string
  time: string
}

type PostMetadata = {
  createdAt: string
  boardId: number
  full: boolean
}

type PostDetail = {
  personnel: number
  content: string
}

type Form = Omit<PostBasicInfo, 'time'> & {
  hour: number
  minute: number
}

type Author = { author: PostAuthorType }
type PostSummary = PostBasicInfo & PostMetadata

export type PostContent = PostBasicInfo & PostDetail
export type PostId = Pick<PostMetadata, 'boardId'>
export type PostForm = Form & PostDetail

export type PostResponse = {
  result: PostSummary[]
}

export type PostSearchRequest = {
  urls: PostSearchType
}
export type PostSearchResponse = {
  result: PostSummary[]
}

export type PostRecruitResponse = {
  result: PostSummary[]
}

export type PostDetailRequest = {
  urls: PostId
}
export type PostDetailResponse = PostBasicInfo & PostMetadata & PostDetail & Author

export type PostCreateRequest = {
  body: PostContent
}

export type PostEditPageRequest = {
  urls: PostId
}

export type PostEditRequest = {
  body: PostContent
  urls: PostId
}

export type PostDeleteRequest = {
  urls: PostId
}

export type PostIsFullRequest = {
  body: Pick<PostMetadata, 'full'>
  urls: PostId
}
