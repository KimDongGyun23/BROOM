import { useEffect } from 'react'

import {
  useTrainingScheduleActions,
  useTrainingScheduleList,
} from '@/entities/admin/model/trainingSchedule.store'
import { useFetchDateFilter } from '@/entities/board/api/useBoard.query'

export const useTrainingSchedule = () => {
  const { data: fetchedScheduleList, isError } = useFetchDateFilter()
  const scheduleList = useTrainingScheduleList()
  const { initializeSchedules } = useTrainingScheduleActions()

  useEffect(() => {
    if (fetchedScheduleList && fetchedScheduleList.dates.length) {
      initializeSchedules(fetchedScheduleList.dates)
    }
  }, [fetchedScheduleList, initializeSchedules])

  const sortedScheduleList = [...scheduleList].sort(
    (a, b) => new Date(a.trainingDate).getTime() - new Date(b.trainingDate).getTime(),
  )

  return { sortedScheduleList, isError, fetchedScheduleList }
}
