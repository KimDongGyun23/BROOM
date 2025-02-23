import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { instance } from '@/app/api'
import type { LoginCredentials } from '@/features/auth/model/auth.type'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { SESSION_KEYS, setSessionStorageItem } from '@/shared/lib/storage'

import { useLogin } from '../api/useAuth.mutation'
import { loginSchema } from '../config/auth.schema'

export const useLoginForm = () => {
  const navigate = useNavigate()
  const [isLoginFailed, setIsLoginFailed] = useState(false)
  const { mutate: login } = useLogin()

  const formMethod = useCustomForm<LoginCredentials>(loginSchema, {
    defaultValues: {
      userId: 'test01',
      password: 'password',
    },
  })
  const { handleSubmit } = formMethod

  const handleLogin = (formData: LoginCredentials) => {
    login(
      { body: { ...formData } },
      {
        onSuccess: ({ nickname }) => {
          if (instance.hasToken()) {
            setIsLoginFailed(false)
            setSessionStorageItem(SESSION_KEYS.NICKNAME, nickname)
            navigate('/home', { replace: true })
          }
        },
        onError: () => setIsLoginFailed(true),
      },
    )
  }

  return { formMethod, onSubmit: handleSubmit(handleLogin), isLoginFailed }
}
