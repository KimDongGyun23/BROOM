import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import type { TeamForm } from '@/types/team'

import { useTeamCreate } from '../query'

const formatSubmissionData = (formData: TeamForm) => {
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

  const handleTeamCreation = (formData: TeamForm) => {
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
