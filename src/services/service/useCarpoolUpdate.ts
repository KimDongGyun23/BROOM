import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import { useUpdateCarpool } from '@/services/query'
import type { CarpoolFormType } from '@/types'

const formatFormData = (formData: CarpoolFormType) => {
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
  const { mutate: editMutation } = useUpdateCarpool()

  const handleSubmitForm = (formData: CarpoolFormType) => {
    const sendingFormData = formatFormData(formData)

    editMutation(
      { body: sendingFormData, urls: { carpoolBoardId: parseInt(postId) } },
      {
        onSuccess: () => navigate(`/carpool/detail/${postId}`, { replace: true }),
      },
    )
  }

  return { handleSubmitForm }
}
