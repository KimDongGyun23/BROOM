import type { TrainingDate } from '@/entities/admin/model/admin.type'
import { useTrainingScheduleActions } from '@/features/training-date/model/trainingSchedule.store'

import { useRemoveTrainingDateMutation } from '../api/useRemoveTrainingDate.mutation'

export const useRemoveTrainingDate = () => {
  const { mutate: deleteTrainingDate } = useRemoveTrainingDateMutation()

  const { removeTrainingDate } = useTrainingScheduleActions()

  const handleRemoveTrainingDate = (id: TrainingDate['id']) => {
    deleteTrainingDate({ urls: { id } }, { onSuccess: () => removeTrainingDate(id) })
  }

  return { handleRemoveTrainingDate }
}
