import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import type { PostForm } from '@/types/post'

import { useTeamCreate } from '../query/useTeamQuery'

const formatSubmissionData = (formData: PostForm) => {
  const { hour, minute, trainingDate, ...rest } = formData
  return {
    trainingDate: dayjs(trainingDate, 'YYYYMMDD').format('YYYY-MM-DD'),
    time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    ...rest,
  }
}

export const useTeamCreation = () => {
  const navigate = useNavigate()
  const { mutate: createTeam } = useTeamCreate()

  const handleTeamCreation = (formData: PostForm) => {
    const submissionData = formatSubmissionData(formData)
    createTeam(
      { body: submissionData },
      {
        onSuccess: ({ boardId }) => navigate(`/team/detail/${boardId}`, { replace: true }),
      },
    )
  }

  return { handleTeamCreation }
}
