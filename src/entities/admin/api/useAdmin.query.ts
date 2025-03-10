import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

import { instance } from '../../../app/api'
import type {
  BusApplicantListResponse,
  BusApplicationToggleResponse,
  BusTotalApplicantCountResponse,
  TotalPostCountResponse,
  TotalUserCountResponse,
  TrainingScheduleListResponse,
} from '../model/admin.type'

const ENDPOINTS = {
  fetchDateTag: `/date-tag`,
  fetchBusApplicantToggleState: `/admin/bus/activate`,
  fetchBusApplicantList: `/admin/bus/reservation`,
  fetchBusTotalApplicantCont: `/admin/bus/reservation/count`,
  fetchTotalPostCont: `/admin/board-count`,
  fetchTotalUserCont: `/admin/user-count`,
} as const

export const queryKeys = {
  all: ['admin'] as const,
  dateTag: () => [...queryKeys.all, 'date-filter'] as const,
  busApplicantToggleState: () => [...queryKeys.all, 'bus-applicant-toggle-state'] as const,
  busApplicantList: () => [...queryKeys.all, 'bus-applicant-list'] as const,
  busTotalApplicantCount: () => [...queryKeys.all, 'bus-applicant-count'] as const,
  totalPostCount: () => [...queryKeys.all, 'post-count'] as const,
  totalUserCount: () => [...queryKeys.all, 'user-count'] as const,
}

export const useFetchDateFilter = () => {
  return useQuery({
    queryKey: queryKeys.dateTag(),
    queryFn: () => instance.get<TrainingScheduleListResponse>(ENDPOINTS.fetchDateTag),
  })
}

export const useFetchBusApplicantToggleState = () =>
  useSuspenseQuery({
    queryKey: queryKeys.busApplicantToggleState(),
    queryFn: () =>
      instance.get<BusApplicationToggleResponse>(ENDPOINTS.fetchBusApplicantToggleState),
  })

export const useFetchBusApplicantList = () =>
  useSuspenseQuery({
    queryKey: queryKeys.busApplicantList(),
    queryFn: () => instance.get<BusApplicantListResponse>(ENDPOINTS.fetchBusApplicantList),
  })

export const useFetchBusTotalApplicantCount = () =>
  useQuery({
    queryKey: queryKeys.busTotalApplicantCount(),
    queryFn: () =>
      instance.get<BusTotalApplicantCountResponse>(ENDPOINTS.fetchBusTotalApplicantCont),
  })

export const useFetchTotalPostCount = () =>
  useQuery({
    queryKey: queryKeys.totalPostCount(),
    queryFn: () => instance.get<TotalPostCountResponse>(ENDPOINTS.fetchTotalPostCont),
  })

export const useFetchTotalUserCount = () =>
  useQuery({
    queryKey: queryKeys.totalUserCount(),
    queryFn: () => instance.get<TotalUserCountResponse>(ENDPOINTS.fetchTotalUserCont),
  })
