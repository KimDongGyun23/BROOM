import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import type {
  LoginRequest,
  SignupRequest,
  ValidateIdRequest,
  ValidateNicknameRequest,
} from '@/types/auth'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

const BASE_URL = import.meta.env.VITE_PUBLIC_SERVER_DOMAIN

const API_ENDPOINTS = {
  SIGN_IN: `${BASE_URL}/signin`,
  SIGN_UP: `${BASE_URL}/signup`,
  VALIDATE_ID: `${BASE_URL}/validate-id`,
  VALIDATE_NICKNAME: `${BASE_URL}/validate-nickname`,
  REISSUE: `${BASE_URL}/reissue`,
} as const

export const useLogin = () => {
  return useMutation<void, Error, LoginRequest>({
    mutationFn: async ({ body }) =>
      await axios.post(API_ENDPOINTS.SIGN_IN, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
  })
}

export const useSignup = () => {
  return useMutation<void, Error, SignupRequest>({
    mutationFn: async ({ body }) => await axios.post(API_ENDPOINTS.SIGN_UP, body),
  })
}

export const useValidateId = () => {
  return useMutation<void, Error, ValidateIdRequest>({
    mutationFn: async ({ body }) => await axios.post(API_ENDPOINTS.VALIDATE_ID, body),
  })
}

export const useValidateNickname = () => {
  return useMutation<void, Error, ValidateNicknameRequest>({
    mutationFn: async ({ body }) => await axios.post(API_ENDPOINTS.VALIDATE_ID, body),
  })
}

export const reIssue = async () => {
  return await axios.post(`${BASE_URL}/reissue`, undefined, {
    headers: {
      refresh: getSessionStorageItem(SESSION_KEYS.REFRESH),
    },
  })
}
