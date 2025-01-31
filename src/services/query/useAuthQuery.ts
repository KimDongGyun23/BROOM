import { useMutation } from '@tanstack/react-query'

import type {
  LoginRequest,
  SignupRequest,
  ValidateIdRequest,
  ValidateNicknameRequest,
} from '@/types/auth'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

import { instance, instanceWithoutAuth } from '.'

const ENDPOINTS = {
  signIn: `/signin`,
  signUp: `$/signup`,
  validateId: `$/validate-id`,
  validateNickname: `$/validate-nickname`,
  reIssue: `/reissue`,
} as const

export const useLogin = () => {
  return useMutation<void, Error, LoginRequest>({
    mutationFn: async ({ body }) =>
      await instanceWithoutAuth.post(ENDPOINTS.signIn, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
  })
}

export const useSignup = () => {
  return useMutation<void, Error, SignupRequest>({
    mutationFn: async ({ body }) => await instanceWithoutAuth.post(ENDPOINTS.signUp, body),
  })
}

export const useValidateId = () => {
  return useMutation<void, Error, ValidateIdRequest>({
    mutationFn: async ({ body }) => await instanceWithoutAuth.post(ENDPOINTS.validateId, body),
  })
}

export const useValidateNickname = () => {
  return useMutation<void, Error, ValidateNicknameRequest>({
    mutationFn: async ({ body }) =>
      await instanceWithoutAuth.post(ENDPOINTS.validateNickname, body),
  })
}

export const reIssue = async () => {
  const response = await instanceWithoutAuth.post(ENDPOINTS.reIssue, null, {
    headers: {
      refresh: getSessionStorageItem(SESSION_KEYS.REFRESH),
    },
  })

  const newToken = response.headers['authorization']
  if (newToken) instance.setAccessToken(newToken)
  else console.error('토큰이 존재하지 않습니다.')

  return response
}
