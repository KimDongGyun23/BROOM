import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { LoginFormType } from '@/types'
import { SESSION_KEYS, setSessionStorageItem } from '@/utils/storage'

import { api, useLogin } from '../query'

export const useLoginLogic = () => {
  const [isLoginFailed, setIsLoginFailed] = useState(false)
  const { mutate: login } = useLogin()
  const navigate = useNavigate()

  const handleLoginSuccess = (headers, data) => {
    api.setAccessToken(headers.authorization)
    setIsLoginFailed(false)
    setSessionStorageItem(SESSION_KEYS.REFRESH, headers.refresh)
    setSessionStorageItem(SESSION_KEYS.LOGIN, 'true')
    setSessionStorageItem(SESSION_KEYS.NICKNAME, data.nickname)
    setSessionStorageItem(SESSION_KEYS.MILITARY_CHAPLAIN, data.militaryChaplain)
    navigate('/home', { replace: true })
  }

  const handleLoginError = () => setIsLoginFailed(true)

  const handleLogin = (formData: LoginFormType) => {
    login(
      { body: { userId: formData.userId, password: formData.password } },
      {
        onSuccess: ({ headers, data }) => handleLoginSuccess(headers, data),
        onError: handleLoginError,
      },
    )
  }

  return { isLoginFailed, handleLogin }
}
