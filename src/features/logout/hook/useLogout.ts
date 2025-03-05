import { useAuthActions } from '@/features/login/model/auth.store'
import { useModalActions } from '@/shared/model/modal.store'

import { useLogoutMutation } from '../api/useLogout.mutation'

export const useLogout = () => {
  const { mutate: logoutMutation } = useLogoutMutation()
  const { openOneButtonModal } = useModalActions()
  const { logout } = useAuthActions()

  const handleLogout = () => {
    logoutMutation(undefined, {
      onSuccess: (response) => {
        openOneButtonModal(response, true)
        logout()
      },
      onError: (error) => openOneButtonModal(error.message, false),
    })
  }

  return { handleLogout }
}
