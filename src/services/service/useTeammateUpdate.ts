import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import { useUpdateTeammate } from '@/services/query'
import type { TeammateFormType } from '@/types'

const formatFormData = (formData: TeammateFormType) => {
  const { hour, minute, trainingDate, ...rest } = formData
  return {
    trainingDate: dayjs(trainingDate, 'YYYYMMDD').format('YYYY-MM-DD'),
    meetingTime: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    ...rest,
  }
}

export const useTeammateUpdate = (postId: string) => {
  const navigate = useNavigate()
  const { mutate: teammateUpdate } = useUpdateTeammate()

  const handleSubmitForm = (formData: TeammateFormType) => {
    const sendingFormData = formatFormData(formData)

    teammateUpdate(
      { body: sendingFormData, urls: { teamBoardId: parseInt(postId) } },
      {
        onSuccess: () => navigate(`/teammate/detail/${postId}`, { replace: true }),
      },
    )
  }

  return { handleSubmitForm }
}
