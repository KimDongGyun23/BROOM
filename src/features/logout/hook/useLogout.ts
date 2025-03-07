import { useNavigate } from 'react-router-dom'

import { instance } from '@/app/api'
import { useAuthActions } from '@/features/login/model/auth.store'
import { useModalActions } from '@/shared/model/modal.store'

import { useLogoutMutation } from '../api/useLogout.mutation'

export const useLogout = () => {
  const navigate = useNavigate()

  const { mutate: logoutMutation } = useLogoutMutation()

  const { openOneButtonModal } = useModalActions()

  const { logout } = useAuthActions()

  const handleLogout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        logout()
        instance.resetAccessToken()
        navigate('/home')
      },
      onError: (error) => openOneButtonModal(error.message, false),
    })
  }

  return { handleLogout }
}
