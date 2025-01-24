import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import type { PostForm } from '@/types/post'

import { useCreateCarpoolPost } from '../query/useCarpoolQuery'

const formatSubmissionData = (formData: PostForm) => {
  const { hour, minute, trainingDate, ...rest } = formData
  return {
    trainingDate: dayjs(trainingDate, 'YYYYMMDD').format('YYYY-MM-DD'),
    time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    ...rest,
  }
}

export const useCarpoolCreation = () => {
  const navigate = useNavigate()
  const { mutate: createCarpool } = useCreateCarpoolPost()

  const handleCarpoolCreation = (formData: PostForm) => {
    const submissionData = formatSubmissionData(formData)
    createCarpool(
      { body: submissionData },
      {
        onSuccess: ({ boardId }) => navigate(`/carpool/detail/${boardId}`, { replace: true }),
      },
    )
  }

  return { handleCarpoolCreation }
}
