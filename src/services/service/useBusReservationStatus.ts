import { useState } from 'react'

import type { BusReservationState } from '@/utils/constants'
import { BUS_RESERVATION_STATES } from '@/utils/constants'

import { useBusReservationQuery } from '../query/useBusQuery'

type ReturnType = (studentId: string) => {
  reservationState: BusReservationState
  checkReservation: VoidFunction
}

export const useBusReservationStatus: ReturnType = (studentId) => {
  const [state, setState] = useState<BusReservationState>(BUS_RESERVATION_STATES.PENDING)
  const { refetch } = useBusReservationQuery({ urls: { studentId } })

  const checkReservation = () => {
    refetch()
      .then(({ data, isSuccess }) => {
        if (isSuccess) {
          setState(
            data.reserved ? BUS_RESERVATION_STATES.COMPLETED : BUS_RESERVATION_STATES.NOT_FOUND,
          )
        } else setState(BUS_RESERVATION_STATES.NOT_FOUND)
      })
      .catch(() => {
        setState(BUS_RESERVATION_STATES.NOT_FOUND)
      })
  }

  return { reservationState: state, checkReservation }
}
