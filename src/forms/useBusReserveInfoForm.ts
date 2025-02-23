import { useState } from 'react'
import { z } from 'zod'

import { useBusReservationQuery } from '@/query/useBusQuery'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import type { BusReservationCheck } from '@/types/bus'
import type { BusReservationState } from '@/utils/constants'
import { BUS_RESERVATION_STATES } from '@/utils/constants'

export const busReserveInfoAttribute = {
  STUDENT_ID: {
    section: 'studentId',
    label: '학번',
    input: { placeholder: '학번을 입력해주세요.', maxLength: 10 },
  },
} as const

const busReserveInfoSchema = z.object({
  studentId: z.string().length(10, { message: '학번은 10자리 숫자여야 합니다.' }),
})

export const useBusReserveInfoForm = () => {
  const formMethod = useCustomForm<BusReservationCheck>(busReserveInfoSchema)
  const { handleSubmit, watch } = formMethod

  const studentId = watch(busReserveInfoAttribute.STUDENT_ID.section)

  const [reservationStatus, setReservationStatus] = useState<BusReservationState>(
    BUS_RESERVATION_STATES.PENDING,
  )

  const { refetch: fetchBusReservation } = useBusReservationQuery({ urls: { studentId } })

  const fetchAndUpdateReservationStatus = async () => {
    try {
      const { data, isSuccess } = await fetchBusReservation()

      if (isSuccess) {
        setReservationStatus(
          data.reserved ? BUS_RESERVATION_STATES.COMPLETED : BUS_RESERVATION_STATES.NOT_FOUND,
        )
      } else {
        setReservationStatus(BUS_RESERVATION_STATES.NOT_FOUND)
      }
    } catch {
      setReservationStatus(BUS_RESERVATION_STATES.NOT_FOUND)
    }
  }

  return { reservationStatus, formMethod, onSubmit: handleSubmit(fetchAndUpdateReservationStatus) }
}
