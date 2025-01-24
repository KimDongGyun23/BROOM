import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import { useUpdateCarpool } from '@/services/query/useCarpoolQuery'
import type { PostForm } from '@/types/post'

const formatFormData = (formData: PostForm) => {
  const { hour, minute, trainingDate, ...rest } = formData
  return {
    trainingDate: dayjs(trainingDate, 'YYYYMMDD').format('YYYY-MM-DD'),
    time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    ...rest,
  }
}

export const useCarpoolUpdate = (postId: string) => {
  const navigate = useNavigate()
  const { mutate: carpoolUpdate } = useUpdateCarpool()

  const handleSubmitForm = (formData: PostForm) => {
    const sendingFormData = formatFormData(formData)

    carpoolUpdate(
      { body: sendingFormData, urls: { boardId: parseInt(postId) } },
      {
        onSuccess: () => navigate(`/carpool/detail/${postId}`, { replace: true }),
      },
    )
  }

  return { handleSubmitForm }
}
