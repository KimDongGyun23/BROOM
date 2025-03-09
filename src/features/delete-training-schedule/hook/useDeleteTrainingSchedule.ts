import type { TrainingSchedule } from '@/entities/admin/model/admin.type'
import { useTrainingScheduleActions } from '@/entities/admin/model/trainingSchedule.store'
import type { OpenModal } from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useDeleteTrainingScheduleMutation } from '../api/useDeleteTrainingSchedule.mutation'

export const useDeleteTrainingSchedule = (openModal: OpenModal) => {
  const { mutate: deleteTrainingSchedule } = useDeleteTrainingScheduleMutation()

  const { removeTrainingDate } = useTrainingScheduleActions()

  const handleDeleteTrainingSchedule = (id: TrainingSchedule['id']) => {
    deleteTrainingSchedule(
      { urls: { id } },
      {
        onSuccess: () => removeTrainingDate(id),
        onError: (error) => openModal(MODAL_KEYS.error, error.message),
      },
    )
  }

  return { handleDeleteTrainingSchedule }
}
