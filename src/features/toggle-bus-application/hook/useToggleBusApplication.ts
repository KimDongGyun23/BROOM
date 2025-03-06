import { useModalActions } from '@/shared/model/modal.store'

import { useToggleBusApplicationMutation } from '../api/useToggleBusApplication.mutation'

export const useToggleBusApplication = () => {
  const { mutate: toggleBusApplication } = useToggleBusApplicationMutation()

  const { openOneButtonModal } = useModalActions()

  const handleToggleBusApplication = () => {
    toggleBusApplication(undefined, {
      onSuccess: (response) => openOneButtonModal(response),
      onError: (error) => openOneButtonModal(error.message),
    })
  }

  return { handleToggleBusApplication }
}
