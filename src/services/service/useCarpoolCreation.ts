import { useNavigate } from 'react-router-dom'

import type { PostForm } from '@/types/post'
import { formatDate } from '@/utils/formatDate'

import { useCreateCarpoolPost } from '../query/useCarpoolQuery'

const formatSubmissionData = (formData: PostForm) => {
  const { hour, minute, trainingDate, ...rest } = formData
  return {
    trainingDate: formatDate(trainingDate, 'default', 'compact'),
    time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    category: 'CARPOOL' as const,
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
