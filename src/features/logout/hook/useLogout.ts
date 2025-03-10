import { useNavigate } from 'react-router-dom'

import { instance } from '@/app/api'
import { useAuthActions } from '@/features/login/model/auth.store'

import { useLogoutMutation } from '../api/useLogout.mutation'

export const useLogout = () => {
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
    })
  }

  return { handleLogout }
}
