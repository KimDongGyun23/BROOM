import type { OpenModal } from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useToggleBusApplicationMutation } from '../api/useToggleBusApplication.mutation'

export const useToggleBusApplication = (openModal: OpenModal) => {
  const { mutate: toggleBusApplication } = useToggleBusApplicationMutation()

  const handleToggleBusApplication = () => {
    toggleBusApplication(undefined, {
      onSuccess: (response) => openModal(MODAL_KEYS.success, response),
      onError: (error) => openModal(MODAL_KEYS.error, error.message),
    })
  }

  return { handleToggleBusApplication }
}
