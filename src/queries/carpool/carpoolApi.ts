import type {
  CarpoolEditPageRequest,
  CarpoolEditResponse,
  CarpoolRecruitResponse,
  CarpoolResponse,
  CarpoolSearchRequest,
} from '@/types'

import { api } from '..'

export const carpoolPage = async () => {
  return await api.get<CarpoolResponse>(`/view/carpool`)
}

export const carpoolRecruit = async () => {
  return await api.get<CarpoolRecruitResponse>(`/view/carpool/recruiting`)
}

export const carpoolSearch = async ({ urls }: CarpoolSearchRequest) => {
  return await api.get<CarpoolResponse>(
    `/view/carpool?category=${urls.category}&keyword=${urls.keyword}`,
  )
}

export const carpoolEditPage = async ({ urls }: CarpoolEditPageRequest) => {
  return await api.get<CarpoolEditResponse>(`/carpool/edit/${urls.carpoolBoardId}`)
}
