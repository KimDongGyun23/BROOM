import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query'

import { instance } from '@/app/api'
import { instanceWithoutAuth } from '@/app/api/instanceWithoutAuth'

import type {
  PostCountResponse,
  TrainingDateListResponse,
  UserCountResponse,
} from '../model/admin.type'

export const adminQueryKeys = {
  all: ['admin'] as const,
  dateTag: () => [...adminQueryKeys.all, 'training-dates'] as const,
  totalPostCount: () => [...adminQueryKeys.all, 'post-count'] as const,
  totalUserCount: () => [...adminQueryKeys.all, 'user-count'] as const,
}

export const useFetchTrainingDates = () =>
  useSuspenseQuery({
    queryKey: adminQueryKeys.dateTag(),
    queryFn: () => instanceWithoutAuth.get<TrainingDateListResponse>('/date-tag'),
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
