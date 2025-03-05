import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { instance } from '@/app/api'
import type { LoginCredentials } from '@/entities/auth/model/auth.type'
import { useModalActions } from '@/shared/model/modal.store'

import { useLoginMutation } from '../api/useLogin.mutation'
import { useAuthActions } from '../model/auth.store'

export const useLogin = () => {
  const navigate = useNavigate()

  const { mutate: loginMutation } = useLoginMutation()
  const { login } = useAuthActions()

  const { openOneButtonModal } = useModalActions()

  const { handleSubmit } = useFormContext<LoginCredentials>()

  const handleLogin = (formData: LoginCredentials) => {
    loginMutation(
      { body: { ...formData } },
      {
        onSuccess: (response) => {
          instance.setAccessToken(response.headers['authorization'])
          login(response.data)
          navigate('/home', { replace: true })
        },
        onError: (error) => openOneButtonModal(error.message),
      },
    )
  }

  return { onSubmit: handleSubmit(handleLogin) }
}
