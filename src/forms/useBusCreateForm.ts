import { useCallback } from 'react'
import { z } from 'zod'

import { useCustomForm } from '@/hooks/useCustomForm'
import { useBusReservationMutation } from '@/services/query/useBusQuery'
import { useModalActions } from '@/stores/modal'
import type { BusReservationForm } from '@/types/bus'

export const busCreateAttribute = {
  NAME: { section: 'name', label: '이름', input: { placeholder: '이름을 입력해주세요.' } },
  STUDENT_ID: {
    section: 'studentId',
    label: '학번',
    input: { placeholder: '학번을 입력해주세요.', type: 'number' },
  },
  PHONE_NUMBER: {
    section: 'phoneNumber',
    label: '연락처',
    input: { placeholder: '-를 제외한 숫자만 입력해주세요.', type: 'number' },
  },
} as const

const busCreateSchema = z.object({
  name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  studentId: z.string().length(10, { message: '학번은 10자리 숫자여야 합니다.' }),
  phoneNumber: z
    .string()
    .min(9, { message: '전화번호를 확인해주세요.' })
    .max(11, { message: '전화번호는 11자리 이하입니다.' }),
})

export const useBusCreateForm = () => {
  const { openModal } = useModalActions()
  const { mutate: reserveBus } = useBusReservationMutation()

  const formMethod = useCustomForm<BusReservationForm>(busCreateSchema)
  const { handleSubmit } = formMethod

  const handleReservation = useCallback(
    (formData: BusReservationForm) => {
      reserveBus(
        { body: formData },
        {
          onSuccess: (response) => openModal(response.data, true),
          onError: (error) => (error.response?.data as string, false),
        },
      )
    },
    [reserveBus, openModal],
  )

  return { formMethod, onSubmit: handleSubmit(handleReservation) }
}
