import { useNavigate } from 'react-router-dom'

import { instance } from '@/app/api'
import { useAuthActions } from '@/features/login/model/auth.store'

import { useLogoutMutation } from '../api/useLogout.mutation'

export const useLogout = (closeModal: VoidFunction) => {
  const navigate = useNavigate()

  const { mutate: logoutMutation } = useLogoutMutation()

  const { logout } = useAuthActions()

  const handleClickLogout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        navigate('/home')
        instance.resetAccessToken()
        closeModal()
        logout()
      },
    })
  }

  return { handleClickLogout }
}
