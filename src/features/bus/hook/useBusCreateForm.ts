import { useCallback } from 'react'

import { useCustomForm } from '@/shared/hook/useCustomForm'
import { useModalActions } from '@/shared/model/modal.store'

import { useBusReservationMutation } from '../api/useBus.mutation'
import { busCreateSchema } from '../config/bus.schema'
import type { BusReservationForm } from '../model/bus.type'

export const useBusCreateForm = () => {
  const { openOneButtonModal } = useModalActions()
  const { mutate: reserveBus } = useBusReservationMutation()

  const formMethod = useCustomForm<BusReservationForm>(busCreateSchema)
  const { handleSubmit } = formMethod

  const handleSubmitForm = useCallback(
    (formData: BusReservationForm) => {
      reserveBus(
        { body: formData },
        {
          onSuccess: (response) => openOneButtonModal(response, true),
          onError: (error) => (error.message, false),
        },
      )
    },
    [reserveBus, openOneButtonModal],
  )

  return { formMethod, onSubmit: handleSubmit(handleSubmitForm) }
}
