import { useFormContext } from 'react-hook-form'

import { useTrainingScheduleActions } from '@/entities/admin/model/trainingSchedule.store'
import { formatDate } from '@/shared/lib/formatDate'
import { useModalActions } from '@/shared/model/modal.store'

import { useCreateTrainingScheduleMutation } from '../api/useCreateTrainingSchedule.mutation'

export const useCreateTrainingSchedule = () => {
  const { mutate: createTrainingSchedule } = useCreateTrainingScheduleMutation()

  const { openOneButtonModal } = useModalActions()

  const { addTrainingDate } = useTrainingScheduleActions()

  const { getValues, resetField } = useFormContext()

  const handleCreateTrainingSchedule = () => {
    const inputDate = getValues('trainingDate')

    createTrainingSchedule(
      { body: { trainingDate: formatDate(inputDate, 'default') } },
      {
        onSuccess: (response) => {
          resetField('trainingDate')
          addTrainingDate(response)
        },
        onError: (error) => openOneButtonModal(error.message),
      },
    )
  }

  return { handleCreateTrainingSchedule }
}
