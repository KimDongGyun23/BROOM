import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { LoginFormType } from '@/types'
import {
  SESSION_LOGIN_KEY,
  SESSION_MILITARY_CHAPLAIN,
  SESSION_NICKNAME,
  SESSION_REFRESH,
  setSessionStorageItem,
} from '@/utils'

import { api, useLogin } from '../query'

export const useLoginLogic = () => {
  const [isLoginFailed, setIsLoginFailed] = useState(false)
  const { mutate: login } = useLogin()
  const navigate = useNavigate()

  const handleLoginSuccess = (headers, data) => {
    api.setAccessToken(headers.authorization)
    setIsLoginFailed(false)
    setSessionStorageItem(SESSION_REFRESH, headers.refresh)
    setSessionStorageItem(SESSION_LOGIN_KEY, 'true')
    setSessionStorageItem(SESSION_NICKNAME, data.nickname)
    setSessionStorageItem(SESSION_MILITARY_CHAPLAIN, data.militaryChaplain)
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
