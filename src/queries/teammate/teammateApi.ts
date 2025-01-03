import type { TeammateIsFullRequest, TeammateResponse, TeammateSearchRequest } from '@/types'

import { api } from '..'

export const teammateSearch = async ({ urls }: TeammateSearchRequest) => {
  return await api.get<TeammateResponse>(
    `/view/team?category=${urls.category}&keyword=${urls.keyword}`,
  )
}

export const teammateCheckFull = async ({ body, urls }: TeammateIsFullRequest) => {
  return await api.put(`/team/check/${urls.teamBoardId}`, body)
}
