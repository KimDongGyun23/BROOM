import { useFormContext } from 'react-hook-form'

import type { TrainingSchedule } from '@/entities/admin/model/admin.type'
import { useModalActions } from '@/shared/model/modal.store'

import { useDeleteTrainingScheduleMutation } from '../api/useDeleteTrainingSchedule.mutation'

export const useDeleteTrainingSchedule = () => {
  const { mutate: deleteTrainingSchedule } = useDeleteTrainingScheduleMutation()

  const { openOneButtonModal } = useModalActions()

  const { resetField } = useFormContext()

  const handleDeleteTrainingSchedule = (id: TrainingSchedule['id']) => {
    deleteTrainingSchedule(
      { urls: { id } },
      {
        onSuccess: () => resetField('trainingDate'),
        onError: (error) => openOneButtonModal(error.message),
      },
    )
  }

  return { handleDeleteTrainingSchedule }
}
