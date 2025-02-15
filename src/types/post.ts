import type { MilitaryBranchCode } from '@/utils/constants'

type PostAuthor = {
  nickname: string
  reserveYear: number
  militaryBranch: MilitaryBranchCode
}

type PostBasicInfo = {
  title: string
  trainingDate: string
  place: string
  time: string
}

type PostDetail = PostBasicInfo & {
  personnel: number
  content: string
}

type PostStatus = {
  createdAt: string
  boardId: string
  currentPersonnel: number
  totalPersonnel: number
  bookmark: boolean
}

export type PostId = Pick<PostStatus, 'boardId'>

export type CarpoolForm = Omit<PostDetail, 'time' | 'personnel'> & {
  personnel: string
  hour: string
  minute: string
}

export type CarpoolCreateRequest = {
  body: PostDetail
}

export type CarpoolEditRequest = {
  body: PostDetail
  urls: PostId
}

export type PostDetailRequest = {
  urls: PostId
}
export type PostDetailResponse = {
  author: PostAuthor
  status: PostStatus
  contentDetail: PostDetail
}

export type PostDeleteRequest = {
  urls: PostId
}

export type PostSetBookmarkRequest = {
  body: PostId
}

export type PostDeleteBookmarkRequest = {
  urls: PostId
}

export type PostRequest = {
  urls: {
    pageParam?: number | unknown
    isAllShow: boolean
  }
}

export type PostResponse = {
  result: {
    status: PostStatus
    content: PostBasicInfo
  }[]
  hasNext: boolean
}

export type CarpoolSearchRequest = {
  urls: {
    pageParam?: number | unknown
    isAllShow: boolean
    type: string
    keyword: string
  }
}
