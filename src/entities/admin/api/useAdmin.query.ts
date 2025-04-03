import { useQuery, useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query'

import { instance, instanceWithoutAuth } from '../../../app/api'
import type {
  BusApplicationToggleResponse,
  PostCountResponse,
  TrainingDateListResponse,
  UserCountResponse,
} from '../model/admin.type'

export const adminQueryKeys = {
  all: ['admin'] as const,
  dateTag: () => [...adminQueryKeys.all, 'training-dates'] as const,
  busApplicantToggleState: () => [...adminQueryKeys.all, 'bus-applicant-toggle'] as const,
  totalPostCount: () => [...adminQueryKeys.all, 'post-count'] as const,
  totalUserCount: () => [...adminQueryKeys.all, 'user-count'] as const,
}

export const useFetchTrainingDates = () =>
  useQuery({
    queryKey: adminQueryKeys.dateTag(),
    queryFn: () => instanceWithoutAuth.get<TrainingDateListResponse>('/date-tag'),
    select: (data) => data.data,
  })

export const useFetchBusApplicantToggleState = () =>
  useSuspenseQuery({
    queryKey: adminQueryKeys.busApplicantToggleState(),
    queryFn: () => instance.get<BusApplicationToggleResponse>('/admin/bus/activate'),
  })

export const useFetchAdminOverviewData = () =>
  useSuspenseQueries({
    queries: [
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
