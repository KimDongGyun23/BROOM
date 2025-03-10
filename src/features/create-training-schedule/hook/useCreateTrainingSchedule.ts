import { useFormContext } from 'react-hook-form'

import { useTrainingScheduleActions } from '@/entities/admin/model/trainingSchedule.store'
import { formatDate } from '@/shared/lib/formatDate'

import { useCreateTrainingScheduleMutation } from '../api/useCreateTrainingSchedule.mutation'

export const useCreateTrainingSchedule = () => {
  const { mutate: createTrainingSchedule } = useCreateTrainingScheduleMutation()

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
      },
    )
  }

  return { handleCreateTrainingSchedule }
}
