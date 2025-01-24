import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import type { PostForm } from '@/types/post'

import { useUpdateTeam } from '../query/useTeamQuery'

const formatFormData = (formData: PostForm) => {
  const { hour, minute, trainingDate, ...rest } = formData
  return {
    trainingDate: dayjs(trainingDate, 'YYYYMMDD').format('YYYY-MM-DD'),
    time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    ...rest,
  }
}

export const useTeamUpdate = (postId: string) => {
  const navigate = useNavigate()
  const { mutate: teamUpdate } = useUpdateTeam()

  const handleSubmitForm = (formData: PostForm) => {
    const sendingFormData = formatFormData(formData)

    teamUpdate(
      { body: sendingFormData, urls: { boardId: parseInt(postId) } },
      {
        onSuccess: () => navigate(`/team/detail/${postId}`, { replace: true }),
      },
    )
  }

  return { handleSubmitForm }
}
