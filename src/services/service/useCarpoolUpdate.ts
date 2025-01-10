import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import { useUpdateCarpool } from '@/services/query/useCarpoolQuery'
import type { CarpoolForm } from '@/types/carpool'

const formatFormData = (formData: CarpoolForm) => {
  const { hour, minute, trainingDate, price, ...rest } = formData
  return {
    trainingDate: dayjs(trainingDate, 'YYYYMMDD').format('YYYY-MM-DD'),
    departTime: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    price: parseInt(price.toString().replace(/,/g, ''), 10),
    ...rest,
  }
}

export const useCarpoolUpdate = (postId: string) => {
  const navigate = useNavigate()
  const { mutate: carpoolUpdate } = useUpdateCarpool()

  const handleSubmitForm = (formData: CarpoolForm) => {
    const sendingFormData = formatFormData(formData)

    carpoolUpdate(
      { body: sendingFormData, urls: { carpoolBoardId: parseInt(postId) } },
      {
        onSuccess: () => navigate(`/carpool/detail/${postId}`, { replace: true }),
      },
    )
  }

  return { handleSubmitForm }
}
