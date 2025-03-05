import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

import { instance, instanceWithoutAuth } from '@/app/api'
import type {
  LoginRequest,
  LoginResponse,
  ValidateNicknameRequest,
} from '@/entities/auth/model/auth.type'

const ENDPOINTS = {
  signIn: `/login`,
  validateNickname: `/validate-nickname`,
  reIssue: `/reissue`,
} as const

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async ({ body }) =>
      await instanceWithoutAuth
        .post(ENDPOINTS.signIn, body, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then((res) => {
          instance.setAccessToken(res.headers['authorization'])
          return res.data
        }),
  })
}

export const useValidateNickname = () =>
  useMutation<AxiosResponse<string>, AxiosError, ValidateNicknameRequest>({
    mutationFn: async ({ body }) =>
      await instanceWithoutAuth.post(ENDPOINTS.validateNickname, body),
  })

export const reIssue = async () => {
  try {
    const response = await instanceWithoutAuth.post(ENDPOINTS.reIssue, null)
    const token = response.headers['authorization']

    if (token) {
      instance.setAccessToken(token)
      return response
    }

    return null
  } catch (error) {
    console.error('재발급 요청 실패:', error)
    return null
  }
}
