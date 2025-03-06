import { useQuery } from '@tanstack/react-query'

import { instance } from '../../../app/api'
import type {
  BusApplicantListResponse,
  BusTotalApplicantCountResponse,
  TrainingScheduleListResponse,
} from '../model/admin.type'

const ENDPOINTS = {
  fetchDateTag: `/date-tag`,
  fetchBusApplicantList: `/admin/bus/reservation`,
} as const

export const queryKeys = {
  all: ['admin'] as const,
  dateTag: () => [...queryKeys.all, 'date-filter'] as const,
  busApplicantList: () => [...queryKeys.all, 'bus-applicant-list'] as const,
  busTotalApplicantCount: () => [...queryKeys.all, 'bus-applicant-count'] as const,
}

export const useFetchDateFilter = () => {
  return useQuery({
    queryKey: queryKeys.dateTag(),
    queryFn: () => instance.get<TrainingScheduleListResponse>(ENDPOINTS.fetchDateTag),
  })
}

export const useFetchBusApplicantList = () =>
  useQuery({
    queryKey: queryKeys.busApplicantList(),
    queryFn: () => instance.get<BusApplicantListResponse>(ENDPOINTS.fetchBusApplicantList),
  })

export const useFetchBusTotalApplicantCount = () =>
  useQuery({
    queryKey: queryKeys.busApplicantList(),
    queryFn: () => instance.get<BusTotalApplicantCountResponse>(ENDPOINTS.fetchBusApplicantList),
  })
