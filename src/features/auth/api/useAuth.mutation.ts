import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

import { instance, instanceWithoutAuth } from '@/app/api'
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  ValidateIdRequest,
  ValidateNicknameRequest,
} from '@/features/auth/model/auth.type'

const ENDPOINTS = {
  signIn: `/login`,
  signUp: `/signup`,
  validateId: `/validate-id`,
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

export const useSignup = () => {
  return useMutation<void, Error, SignupRequest>({
    mutationFn: async ({ body }) => await instanceWithoutAuth.post(ENDPOINTS.signUp, body),
  })
}

export const useValidateId = () => {
  return useMutation<AxiosResponse, AxiosError, ValidateIdRequest>({
    mutationFn: async ({ body }) => await instanceWithoutAuth.post(ENDPOINTS.validateId, body),
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
