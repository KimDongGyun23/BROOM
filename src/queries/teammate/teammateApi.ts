import type {
  TeammateEditPageRequest,
  TeammateEditRequest,
  TeammateEditResponse,
  TeammateIsFullRequest,
  TeammateResponse,
  TeammateSearchRequest,
} from '@/types'

import { api } from '..'

export const teammateSearch = async ({ urls }: TeammateSearchRequest) => {
  return await api.get<TeammateResponse>(
    `/view/team?category=${urls.category}&keyword=${urls.keyword}`,
  )
}

export const teammateEditPage = async ({ urls }: TeammateEditPageRequest) => {
  return await api.get<TeammateEditResponse>(`/team/edit/${urls.teamBoardId}`)
}

export const teammateEdit = async ({ body, urls }: TeammateEditRequest) => {
  return await api.put(`/team/edit/${urls.teamBoardId}`, body)
}

export const teammateCheckFull = async ({ body, urls }: TeammateIsFullRequest) => {
  return await api.put(`/team/check/${urls.teamBoardId}`, body)
}
