import { useFormContext } from 'react-hook-form'

import { useTrainingScheduleActions } from '@/entities/admin/model/trainingSchedule.store'
import { formatDate } from '@/shared/lib/formatDate'

import { useAddTrainingDateMutation } from '../api/useAddTrainingDate.mutation'

export const useAddTrainingDate = () => {
  const { mutate: addTrainingDateMutation } = useAddTrainingDateMutation()

  const { addTrainingDate } = useTrainingScheduleActions()

  const { getValues, resetField } = useFormContext()

  const handleAddTrainingDate = () => {
    const inputDate = getValues('trainingDate')

    addTrainingDateMutation(
      { body: { trainingDate: formatDate(inputDate, 'default') } },
      {
        onSuccess: (response) => {
          resetField('trainingDate')
          addTrainingDate(response)
        },
      },
    )
  }

  return { handleAddTrainingDate }
}
