import { useCallback } from 'react'
import type { To } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const BusReservationCreateModal = () => {
  const navigate = useNavigate()

  const handleModalClose = useCallback(() => {
    navigate(-1 as To, { replace: true })
  }, [navigate])

  return <ModalWithOneButton onClickButton={handleModalClose} />
}
