import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import type { CarpoolFormType } from '@/types'

import { useCarpoolCreate } from '../query'

const formatSubmissionData = (formData: CarpoolFormType) => {
  const { hour, minute, trainingDate, ...rest } = formData
  return {
    trainingDate: dayjs(trainingDate, 'YYYYMMDD').format('YYYY-MM-DD'),
    departTime: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    ...rest,
  }
}

export const useCarpoolCreation = () => {
  const navigate = useNavigate()
  const { mutate: createCarpool } = useCarpoolCreate()

  const handleCarpoolCreation = (formData: CarpoolFormType) => {
    const submissionData = formatSubmissionData(formData)
    createCarpool(
      { body: submissionData },
      {
        onSuccess: ({ carpoolBoardId }) =>
          navigate(`/carpool/detail/${carpoolBoardId}`, { replace: true }),
      },
    )
  }

  return { handleCarpoolCreation }
}
