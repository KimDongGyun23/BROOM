import { useState } from 'react'

import { useBusReserveInfo } from '@/queries'
import type { BusReservationStateType } from '@/types'
import { BUS_RESERVATION_STATES } from '@/utils'

type ReturnType = (studentId: string) => {
  reservationState: BusReservationStateType
  checkReservation: VoidFunction
}

export const useBusReservationStatus: ReturnType = (studentId) => {
  const [state, setState] = useState<BusReservationStateType>(BUS_RESERVATION_STATES.PENDING)
  const { refetch } = useBusReserveInfo({ urls: { studentId } })

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
