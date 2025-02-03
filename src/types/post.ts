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
  isFull: boolean
  isBookmark: boolean
}

type Category = {
  category: TabUpperKey
}
export type PostId = Pick<PostStatus, 'boardId'>

export type PostForm = Omit<PostDetail, 'time'> & {
  personnel: string
  hour: string
  minute: string
}

export type PostCreateRequest = {
  body: PostDetail & Category
}

// export type PostAuthorType = {
//   WriterNickname: string
//   writerDischargeYear: string
//   writerMilitaryChaplain: MilitaryBranchCode
// }

// type PostBasicInfo = {
//   title: string
//   trainingDate: string
//   place: string
//   time: string
// }

// type PostMetadata = {
//   createdAt: string
//   boardId: number
//   full: boolean
//   category?: TabUpperKey
//   isBookmark: boolean
// }

// type PostDetail = {
//   personnel: number
//   content: string
// }

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

// export type PostDetailRequest = {
//   urls: PostId
// }
// export type PostDetailResponse = PostBasicInfo & PostMetadata & PostDetail & PostAuthorType

// export type PostEditPageRequest = {
//   urls: PostId
// }

// export type PostEditRequest = {
//   body: PostContent
//   urls: PostId
// }

// export type PostDeleteRequest = {
//   urls: PostId
// }

// export type PostIsFullRequest = {
//   body: Pick<PostMetadata, 'full'>
//   urls: PostId
// }

// export type PostSetBookmarkRequest = {
//   body: PostId
// }

// export type PostDeleteBookmarkRequest = {
//   urls: PostId
// }
