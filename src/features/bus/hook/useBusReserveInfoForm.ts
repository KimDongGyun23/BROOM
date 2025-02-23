import { useState } from 'react'

import { useBusReservationQuery } from '@/features/bus/api/useBus.query'
import { useCustomForm } from '@/shared/hook/useCustomForm'

import type { BusReservationState } from '../config/bus.constant'
import { BUS_RESERVATION_STATES } from '../config/bus.constant'
import { busReserveInfoAttribute, busReserveInfoSchema } from '../config/bus.schema'
import type { BusReservationCheck } from '../model/bus.type'

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
