import { useEffect } from 'react'

import {
  useTrainingScheduleActions,
  useTrainingScheduleList,
} from '@/entities/admin/model/trainingSchedule.store'

import { useFetchTrainingDates } from '../api/useAdmin.query'

export const useTrainingDates = () => {
  const { data: fetchedDates, isError } = useFetchTrainingDates()

  const scheduleList = useTrainingScheduleList()
  const { initializeTrainingDates } = useTrainingScheduleActions()

  useEffect(() => {
    if (fetchedDates && fetchedDates.dates.length) {
      initializeTrainingDates(fetchedDates.dates)
    }
  }, [fetchedDates, initializeTrainingDates])

  const sortedDates = [...scheduleList].sort(
    (a, b) => new Date(a.trainingDate).getTime() - new Date(b.trainingDate).getTime(),
  )

  return { sortedDates, isError, fetchedDates }
}
