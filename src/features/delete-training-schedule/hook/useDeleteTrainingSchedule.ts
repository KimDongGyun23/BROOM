import type { TrainingSchedule } from '@/entities/admin/model/admin.type'
import { useTrainingScheduleActions } from '@/entities/admin/model/trainingSchedule.store'

import { useDeleteTrainingScheduleMutation } from '../api/useDeleteTrainingSchedule.mutation'

export const useDeleteTrainingSchedule = () => {
  const { mutate: deleteTrainingSchedule } = useDeleteTrainingScheduleMutation()

  const { removeTrainingDate } = useTrainingScheduleActions()

  const handleDeleteTrainingSchedule = (id: TrainingSchedule['id']) => {
    deleteTrainingSchedule({ urls: { id } }, { onSuccess: () => removeTrainingDate(id) })
  }

  return { handleDeleteTrainingSchedule }
}
