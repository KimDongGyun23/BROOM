import { useNavigate } from 'react-router-dom'

import { instance } from '@/app/api'
import { useAuthActions } from '@/features/login/model/auth.store'
import type { OpenModal } from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useLogoutMutation } from '../api/useLogout.mutation'

export const useLogout = (openModal: OpenModal) => {
  const navigate = useNavigate()

  const { mutate: logoutMutation } = useLogoutMutation()

  const { logout } = useAuthActions()

  const handleLogout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        logout()
        instance.resetAccessToken()
        navigate('/home')
      },
      onError: (error) => openModal(MODAL_KEYS.error, error.message),
    })
  }

  return { handleLogout }
}
