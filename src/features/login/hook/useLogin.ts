import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { instance } from '@/app/api'
import type { LoginCredentials } from '@/entities/auth/model/auth.type'

import { useLoginMutation } from '../api/useLogin.mutation'
import { useAuthActions } from '../model/auth.store'

export const useLogin = () => {
  const navigate = useNavigate()

  const { mutate: loginMutation } = useLoginMutation()
  const { login, logout } = useAuthActions()

  const { handleSubmit } = useFormContext<LoginCredentials>()

  const handleLogin = (formData: LoginCredentials) => {
    loginMutation(
      { body: { ...formData } },
      {
        onSuccess: (response) => {
          instance.setAccessToken(response.headers['authorization'])
          login(response.data)
          if (response.data.role === 'ROLE_MEMBER') navigate('/home', { replace: true })
          else if (response.data.role === 'ROLE_ADMIN') navigate('/kw/broom', { replace: true })
          else {
            logout()
            navigate('/404', { replace: true })
          }
        },
      },
    )
  }

  return { onSubmit: handleSubmit(handleLogin) }
}
