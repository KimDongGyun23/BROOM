import type { MilitaryBranchCode } from '@/shared/lib/constants'

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

export type PostForm = Omit<PostDetail, 'time' | 'personnel'> & {
  personnel: string
  hour: string
  minute: string
}

export type PostCreateRequest = {
  body: PostDetail
}

export type PostEditRequest = {
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

export type AddBookmarkRequest = {
  body: PostId
}

export type RemoveBookmarkRequest = {
  urls: PostId
}

export type BoardMainRequest = {
  urls: {
    pageParam?: number | unknown
    recruiting: boolean
  }
}

export type PostListResponse = {
  result: {
    status: PostStatus
    content: PostBasicInfo
  }[]
  hasNext: boolean
}

export type PostSearchRequest = {
  urls: {
    pageParam?: number | unknown
    trainingDate: string | null
    recruiting: boolean
    type: string
    keyword: string | null
  }
}

export type DateFilterResponse = {
  dates: {
    id: number
    trainingDate: string
  }[]
}
