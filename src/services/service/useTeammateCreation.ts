import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import type { TeammateFormType } from '@/types'

import { useTeammateCreate } from '../query'

const formatSubmissionData = (formData: TeammateFormType) => {
  const { hour, minute, trainingDate, ...rest } = formData
  return {
    trainingDate: dayjs(trainingDate, 'YYYYMMDD').format('YYYY-MM-DD'),
    meetingTime: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    ...rest,
  }
}

export const useTeammateCreation = () => {
  const navigate = useNavigate()
  const { mutate: createTeammate } = useTeammateCreate()

  const handleTeammateCreation = (formData: TeammateFormType) => {
    const submissionData = formatSubmissionData(formData)
    createTeammate(
      { body: submissionData },
      {
        onSuccess: ({ teamBoardId }) =>
          navigate(`/teammate/detail/${teamBoardId}`, { replace: true }),
      },
    )
  }

  return { handleTeammateCreation }
}
