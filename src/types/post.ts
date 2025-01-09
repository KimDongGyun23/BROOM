import type { MilitaryBranchCode } from '@/utils/constants'

export type PostItemType = {
  id: number
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

export type PostDetailType = {
  personnel: number
  price?: number
  content: string
}
