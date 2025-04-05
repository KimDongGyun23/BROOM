import { useNavigate } from 'react-router-dom'

import { instance } from '@/app/api'
import type { LoginCredentials } from '@/entities/auth/model/auth.type'

import { useLoginMutation } from '../api/useLogin.mutation'
import { useAuthActions } from '../model/auth.store'

export const useLogin = () => {
  const navigate = useNavigate()

  const { mutate: loginMutation } = useLoginMutation()
  const { login, logout } = useAuthActions()

  const handleLogin = (formData: LoginCredentials) => {
    loginMutation(
      { body: { ...formData } },
      {
        onSuccess: (response) => {
          login(response)
          instance.setAccessToken(response.token)
          if (response.role === 'ROLE_MEMBER') navigate('/home', { replace: true })
          else if (response.role === 'ROLE_ADMIN') navigate('/kw/broom', { replace: true })
          else {
            logout()
            navigate('/404', { replace: true })
          }
        },
      },
    )
  }

  return { handleLogin }
}
