import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { instance } from '@/app/api'
import type { LoginCredentials } from '@/entities/auth/model/auth.type'
import type { OpenModal } from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useLoginMutation } from '../api/useLogin.mutation'
import { useAuthActions } from '../model/auth.store'

export const useLogin = (openModal: OpenModal) => {
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
        onError: (error: Error) => {
          if (axios.isAxiosError(error)) {
            openModal(
              MODAL_KEYS.error,
              error.response?.data || '알 수 없는 서버 오류가 발생했습니다.',
            )
          } else {
            openModal(MODAL_KEYS.error, '알 수 없는 오류가 발생했습니다.')
          }
        },
      },
    )
  }

  return { onSubmit: handleSubmit(handleLogin) }
}
