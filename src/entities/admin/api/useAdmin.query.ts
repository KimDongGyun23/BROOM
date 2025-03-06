import { useQuery } from '@tanstack/react-query'

import { instance } from '../../../app/api'
import type { TrainingScheduleListResponse } from '../model/admin.type'

const ENDPOINTS = {
  fetchDateTag: `/date-tag`,
} as const

export const queryKeys = {
  all: ['admin'] as const,
  dateTag: () => [...queryKeys.all, 'date-filter'] as const,
}

export const useFetchDateFilter = () => {
  return useQuery({
    queryKey: queryKeys.dateTag(),
    queryFn: () => instance.get<TrainingScheduleListResponse>(ENDPOINTS.fetchDateTag),
  })
}
