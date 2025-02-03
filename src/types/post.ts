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

type Category = {
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

// type PostSearchType = {
//   category: string
//   keyword: string
// }

// export type PostSummary = PostBasicInfo & PostMetadata

// export type PostContent = PostBasicInfo & PostDetail

// export type PostForm = Overwrite<Form, { hour: number | string; minute: number | string }> &
//   Overwrite<PostDetail, { personnel: number | string }>

// export type PostResponse = {
//   result: PostSummary[]
// }

// export type PostRequest = {
//   urls: Pick<PostMetadata, 'category'>
// }

// export type PostSearchRequest = {
//   urls: PostSearchType
// }
// export type PostSearchResponse = {
//   result: PostSummary[]
// }

// export type PostRecruitResponse = {
//   result: PostSummary[]
// }

// export type PostSetBookmarkRequest = {
//   body: PostId
// }

// export type PostDeleteBookmarkRequest = {
//   urls: PostId
// }
