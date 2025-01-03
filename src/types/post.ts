import type { KEBAB_LIST } from '@/utils'

import type { IconType } from './common'

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
  militaryChaplain: IconType
  createdAt: string
}

export type PostSearchType = {
  category: keyof typeof KEBAB_LIST
  keyword: string
}

export type PostDetailType = {
  personnel: number
  price?: number
  content: string
}
