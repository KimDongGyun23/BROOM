import { useCallback } from 'react'

import { useCustomForm } from '@/shared/hook/useCustomForm'
import { useModalActions } from '@/shared/model/modal.store'

import { useBusApplicationMutation } from '../api/useBus.mutation'
import { busCreateSchema } from '../config/bus.schema'
import type { BusApplicationForm } from '../model/bus.type'

export const useBusCreateForm = () => {
  const { openOneButtonModal } = useModalActions()
  const { mutate: reserveBus } = useBusApplicationMutation()

  const formMethod = useCustomForm<BusApplicationForm>(busCreateSchema)
  const { handleSubmit } = formMethod

  const handleSubmitForm = useCallback(
    (formData: BusApplicationForm) => {
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
