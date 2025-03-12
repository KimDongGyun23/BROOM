import { useQuery, useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query'

import { instance } from '../../../app/api'
import type {
  BusApplicantCountResponse,
  BusApplicantListResponse,
  BusApplicationToggleResponse,
  PostCountResponse,
  TrainingDateListResponse,
  UserCountResponse,
} from '../model/admin.type'

export const adminQueryKeys = {
  all: ['admin'] as const,
  dateTag: () => [...adminQueryKeys.all, 'training-dates'] as const,
  busApplicantToggleState: () => [...adminQueryKeys.all, 'bus-applicant-toggle'] as const,
  busApplicantList: () => [...adminQueryKeys.all, 'bus-applicant-list'] as const,
  busTotalApplicantCount: () => [...adminQueryKeys.all, 'bus-applicant-count'] as const,
  totalPostCount: () => [...adminQueryKeys.all, 'post-count'] as const,
  totalUserCount: () => [...adminQueryKeys.all, 'user-count'] as const,
}

export const useFetchTrainingDates = () =>
  useQuery({
    queryKey: adminQueryKeys.dateTag(),
    queryFn: () => instance.get<TrainingDateListResponse>('/date-tag'),
  })

export const useFetchBusApplicantToggleState = () =>
  useSuspenseQuery({
    queryKey: adminQueryKeys.busApplicantToggleState(),
    queryFn: () => instance.get<BusApplicationToggleResponse>('/admin/bus/activate'),
  })

export const useFetchBusApplicantList = () =>
  useSuspenseQuery({
    queryKey: adminQueryKeys.busApplicantList(),
    queryFn: () => instance.get<BusApplicantListResponse>('/admin/bus/reservation'),
  })

export const useFetchAdminOverviewData = () =>
  useSuspenseQueries({
    queries: [
      {
        queryKey: adminQueryKeys.busTotalApplicantCount(),
        queryFn: () => instance.get<BusApplicantCountResponse>('/admin/bus/reservation/count'),
      },
      {
        queryKey: adminQueryKeys.totalPostCount(),
        queryFn: () => instance.get<PostCountResponse>('/admin/board-count'),
      },
      {
        queryKey: adminQueryKeys.totalUserCount(),
        queryFn: () => instance.get<UserCountResponse>('/admin/user-count'),
      },
    ],
  })
