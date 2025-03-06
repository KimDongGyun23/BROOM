import { useFormContext } from 'react-hook-form'

import { formatDate } from '@/shared/lib/formatDate'
import { useModalActions } from '@/shared/model/modal.store'

import { useCreateTrainingScheduleMutation } from '../api/useCreateTrainingSchedule.mutation'
import { useTrainingScheduleActions } from '../model/trainingSchedule.store'

export const useCreateTrainingSchedule = () => {
  const { mutate: createTrainingSchedule } = useCreateTrainingScheduleMutation()

  const { openOneButtonModal } = useModalActions()

  const { getValues, resetField } = useFormContext()
  const { addTrainingDate } = useTrainingScheduleActions()

  const handleCreateTrainingSchedule = () => {
    const inputDate = getValues('trainingDate')

    createTrainingSchedule(
      { body: { trainingDate: formatDate(inputDate, 'default') } },
      {
        onSuccess: () => {
          addTrainingDate(inputDate)
          resetField('trainingDate')
        },
        onError: (error) => openOneButtonModal(error.message),
      },
    )
  }

  return { handleCreateTrainingSchedule }
}
