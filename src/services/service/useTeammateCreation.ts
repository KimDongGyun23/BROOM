import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import type { TeamFormType } from '@/types'

import { useTeamCreate } from '../query'

const formatSubmissionData = (formData: TeamFormType) => {
  const { hour, minute, trainingDate, ...rest } = formData
  return {
    trainingDate: dayjs(trainingDate, 'YYYYMMDD').format('YYYY-MM-DD'),
    meetingTime: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    ...rest,
  }
}

export const useTeamCreation = () => {
  const navigate = useNavigate()
  const { mutate: createTeam } = useTeamCreate()

  const handleTeamCreation = (formData: TeamFormType) => {
    const submissionData = formatSubmissionData(formData)
    createTeam(
      { body: submissionData },
      {
        onSuccess: ({ teamBoardId }) => navigate(`/team/detail/${teamBoardId}`, { replace: true }),
      },
    )
  }

  return { handleTeamCreation }
}
