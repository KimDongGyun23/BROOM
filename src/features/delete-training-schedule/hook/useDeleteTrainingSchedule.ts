import type { TrainingSchedule } from '@/entities/admin/model/admin.type'
import { useModalActions } from '@/shared/model/modal.store'

import { useDeleteTrainingScheduleMutation } from '../api/useDeleteTrainingSchedule.mutation'

export const useDeleteTrainingSchedule = () => {
  const { mutate: deleteTrainingSchedule } = useDeleteTrainingScheduleMutation()

  const { openOneButtonModal } = useModalActions()

  const handleDeleteTrainingSchedule = (id: TrainingSchedule['id']) => {
    deleteTrainingSchedule(
      { urls: { id } },
      {
        onError: (error) => openOneButtonModal(error.message),
      },
    )
  }

  return { handleDeleteTrainingSchedule }
}
