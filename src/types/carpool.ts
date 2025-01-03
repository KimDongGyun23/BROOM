import type { IconType } from './common'
import type { PostAuthorType } from './post'

type CarpoolType = {
  carpoolBoardId: number
  title: string
  createdAt: string
  trainingDate: string
  departPlace: string
  departTime: string
  full: boolean
}

export type AuthorType = {
  userId: string
  nickname: string
  dischargeYear: number
  militaryChaplain: IconType
}

type CarpoolSearchType = {
  category: string
  keyword: string
}

type CarpoolDetailType = {
  personnel: number
  price: number
  content: string
}

export type CustomCarpoolDetailType = {
  profile: PostAuthorType
  item: Omit<CarpoolType, 'createdAt'> & CarpoolDetailType
}

export type CarpoolFormType = Pick<CarpoolType, 'title' | 'trainingDate' | 'departPlace'> &
  CarpoolDetailType & { hour: number; minute: number }

export type CarpoolResponse = {
  result: CarpoolType[]
}

export type CarpoolSearchRequest = {
  urls: CarpoolSearchType
}
export type CarpoolSearchResponse = {
  result: CarpoolType[]
}

export type CarpoolRecruitResponse = {
  result: CarpoolType[]
}

export type CarpoolDetailRequest = {
  urls: Pick<CarpoolType, 'carpoolBoardId'>
}
export type CarpoolDetailResponse = CarpoolType &
  CarpoolDetailType & {
    author: AuthorType
  }

export type CarpoolCreateRequest = {
  body: Pick<CarpoolType, 'title' | 'trainingDate' | 'departPlace'> & CarpoolDetailType
}
export type CarpoolCreateResponse = Pick<CarpoolType, 'carpoolBoardId'>

export type CarpoolEditPageRequest = {
  urls: Pick<CarpoolType, 'carpoolBoardId'>
}

export type CarpoolEditRequest = {
  body: Omit<CarpoolDetailType, 'createdAt'>
  urls: Pick<CarpoolType, 'carpoolBoardId'>
}
export type CarpoolEditResponse = Omit<CarpoolType, 'createdAt' | 'full'> & CarpoolDetailType

export type CarpoolDeleteRequest = {
  urls: Pick<CarpoolType, 'carpoolBoardId'>
}

export type CarpoolIsFullRequest = {
  body: Pick<CarpoolType, 'full'>
  urls: Pick<CarpoolType, 'carpoolBoardId'>
}
