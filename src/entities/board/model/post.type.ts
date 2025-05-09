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

export type PostFormType = Omit<PostDetail, 'time' | 'personnel'> & {
  personnel: string
  hour: string
  minute: string
}

export type CreatePostRequest = {
  body: PostDetail
}

export type EditPostRequest = {
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

export type DeletePostRequest = {
  urls: PostId
}

export type AddBookmarkRequest = {
  body: PostId
}

export type RemoveBookmarkRequest = {
  urls: PostId
}

export type PostListRequest = {
  urls: {
    pageParam?: number | unknown
    title: string | null
    place: string | null
    trainingDate: string | null
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

export type DateFilterResponse = {
  dates: {
    id: number
    trainingDate: string
  }[]
}
