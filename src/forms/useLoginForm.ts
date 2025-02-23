import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { instance } from '@/query'
import { useLogin } from '@/query/useAuthQuery'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import type { LoginCredentials } from '@/types/auth'
import { SESSION_KEYS, setSessionStorageItem } from '@/utils/storage'

export const loginAttribute = {
  ID: {
    section: 'userId',
    label: '아이디',
    input: { placeholder: '아이디를 입력해주세요.' },
  },
  PASSWORD: {
    section: 'password',
    label: '비밀번호',
    input: { placeholder: '비밀번호를 입력해주세요.' },
  },
}

const loginSchema = z.object({
  userId: z.string().min(1, { message: '아이디를 입력해주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
})

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
