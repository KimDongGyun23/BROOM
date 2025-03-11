import type { BusApplication } from '@/entities/bus/model/bus.type'
import type { OpenModal } from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useCreateBusApplicationMutation } from '../api/useCreateBusApplication.mutation'

export const useCreateBusApplication = (openModal: OpenModal) => {
  const { mutate: reserveBus } = useCreateBusApplicationMutation()

  const handleCreateBusApplication = (formData: BusApplication) => {
    reserveBus(
      { body: formData },
      { onSuccess: (response) => openModal(MODAL_KEYS.success, response) },
    )
  }

  return { handleCreateBusApplication }
}
