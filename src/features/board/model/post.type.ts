import type { MilitaryBranchCode } from '@/utils/constants'

type CarpoolAuthor = {
  nickname: string
  reserveYear: number
  militaryBranch: MilitaryBranchCode
}

type CarpoolBasicInfo = {
  title: string
  trainingDate: string
  place: string
  time: string
}

type CarpoolDetail = CarpoolBasicInfo & {
  personnel: number
  content: string
}

type CarpoolStatus = {
  createdAt: string
  boardId: string
  currentPersonnel: number
  totalPersonnel: number
  bookmark: boolean
}

export type CarpoolId = Pick<CarpoolStatus, 'boardId'>

export type CarpoolForm = Omit<CarpoolDetail, 'time' | 'personnel'> & {
  personnel: string
  hour: string
  minute: string
}

export type CarpoolCreateRequest = {
  body: CarpoolDetail
}

export type CarpoolEditRequest = {
  body: CarpoolDetail
  urls: CarpoolId
}

export type CarpoolDetailRequest = {
  urls: CarpoolId
}
export type CarpoolDetailResponse = {
  author: CarpoolAuthor
  status: CarpoolStatus
  contentDetail: CarpoolDetail
}

export type CarpoolDeleteRequest = {
  urls: CarpoolId
}

export type CarpoolAddBookmarkRequest = {
  body: CarpoolId
}

export type CarpoolRemoveBookmarkRequest = {
  urls: CarpoolId
}

export type CarpoolMainRequest = {
  urls: {
    pageParam?: number | unknown
    recruiting: boolean
  }
}

export type CarpoolListResponse = {
  result: {
    status: CarpoolStatus
    content: CarpoolBasicInfo
  }[]
  hasNext: boolean
}

export type CarpoolSearchRequest = {
  urls: {
    pageParam?: number | unknown
    recruiting: boolean
    type: string
    keyword: string
  }
}
