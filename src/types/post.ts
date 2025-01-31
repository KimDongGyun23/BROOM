import type { MilitaryBranchCode, TabUpperKey } from '@/utils/constants'

export type PostAuthorType = {
  WriterNickname: string
  writerDischargeYear: string
  writerMilitaryChaplain: MilitaryBranchCode
}

type PostBasicInfo = {
  title: string
  trainingDate: string
  place: string
  time: string
  category?: TabUpperKey
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

type PostSearchType = {
  category: string
  keyword: string
}

export type PostSummary = PostBasicInfo & PostMetadata

export type PostContent = PostBasicInfo & PostDetail
export type PostId = Pick<PostMetadata, 'boardId'>
export type PostForm = Form & PostDetail

export type PostResponse = {
  result: PostSummary[]
}

export type PostRequest = {
  urls: Pick<PostBasicInfo, 'category'>
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
export type PostDetailResponse = PostBasicInfo & PostMetadata & PostDetail & PostAuthorType

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
