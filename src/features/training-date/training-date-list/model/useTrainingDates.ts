import { useEffect } from 'react'

import { useFetchTrainingDates } from '@/entities/admin/api/useAdmin.query'
import {
  useTrainingScheduleActions,
  useTrainingScheduleList,
} from '@/entities/admin/model/trainingSchedule.store'

export const useTrainingDates = () => {
  const { data: fetchedDates, isError } = useFetchTrainingDates()

  const scheduleList = useTrainingScheduleList()

  const { initializeTrainingDates } = useTrainingScheduleActions()

  useEffect(() => {
    if (fetchedDates) {
      initializeTrainingDates(fetchedDates.dates)
    }
  }, [fetchedDates, initializeTrainingDates])

  const sortedDates = [...scheduleList].sort(
    (a, b) => new Date(a.trainingDate).getTime() - new Date(b.trainingDate).getTime(),
  )

  return { sortedDates, isError }
}
