import { useState } from 'react'

import { useBusApplicationQuery } from '@/entities/bus/api/useBus.query'
import type { BusApplicationState } from '@/entities/bus/config/bus.constant'
import { BUS_RESERVATION_STATES } from '@/entities/bus/config/bus.constant'
import { busReserveInfoAttribute, busReserveInfoSchema } from '@/entities/bus/config/bus.schema'
import type { BusApplicationCheck } from '@/entities/bus/model/bus.type'
import { useCustomForm } from '@/shared/hook/useCustomForm'

export const useBusReserveInfoForm = () => {
  const formMethod = useCustomForm<BusApplicationCheck>(busReserveInfoSchema)
  const { handleSubmit, watch } = formMethod

  const studentId = watch(busReserveInfoAttribute.STUDENT_ID.section)

  const [reservationStatus, setReservationStatus] = useState<BusApplicationState>(
    BUS_RESERVATION_STATES.PENDING,
  )

  const { refetch: fetchBusApplication } = useBusApplicationQuery({ urls: { studentId } })

  const fetchAndUpdateReservationStatus = async () => {
    try {
      const { data, isSuccess } = await fetchBusApplication()

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
