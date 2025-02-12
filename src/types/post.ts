import type { MilitaryBranchCode, TabUpperKey } from '@/utils/constants'

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
  full: boolean
  bookmark: boolean
}

export type Category = {
  category: TabUpperKey
}
export type PostId = Pick<PostStatus, 'boardId'>

export type PostForm = Omit<PostDetail, 'time' | 'personnel'> & {
  personnel: string
  hour: string
  minute: string
}

export type PostCreateRequest = {
  body: PostDetail & Category
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

export type PostIsFullRequest = {
  body: Pick<PostStatus, 'full'>
  urls: PostId
}

export type PostSetBookmarkRequest = {
  body: PostId
}

export type PostDeleteBookmarkRequest = {
  urls: PostId
}

export type PostRequest = {
  urls: Category & {
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

export type PostSearchRequest = {
  urls: Category & {
    pageParam?: number | unknown
    isAllShow: boolean
    type: string
    keyword: string
  }
}

export type MyPostRequest = {
  urls: Category & { pageParam?: number | unknown }
}
