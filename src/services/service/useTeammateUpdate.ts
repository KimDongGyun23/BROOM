import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import { useUpdateTeam } from '@/services/query'
import type { TeamFormType } from '@/types'

const formatFormData = (formData: TeamFormType) => {
  const { hour, minute, trainingDate, ...rest } = formData
  return {
    trainingDate: dayjs(trainingDate, 'YYYYMMDD').format('YYYY-MM-DD'),
    meetingTime: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    ...rest,
  }
}

export const useTeamUpdate = (postId: string) => {
  const navigate = useNavigate()
  const { mutate: teamUpdate } = useUpdateTeam()

  const handleSubmitForm = (formData: TeamFormType) => {
    const sendingFormData = formatFormData(formData)

    teamUpdate(
      { body: sendingFormData, urls: { teamBoardId: parseInt(postId) } },
      {
        onSuccess: () => navigate(`/team/detail/${postId}`, { replace: true }),
      },
    )
  }

  return { handleSubmitForm }
}
