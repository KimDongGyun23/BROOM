import { HttpClient } from './HttpClient'

const BASE_URL = import.meta.env.VITE_PUBLIC_SERVER_DOMAIN

export const api = new HttpClient({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export * from './auth/authApi'
export * from './auth/useAuthService'
export * from './carpool/carpoolApi'
export * from './carpool/useCarpoolService'
export * from './chatting/chattingApi'
export * from './chatting/useChattingService'
export * from './HttpClient'
export * from './mypage/mypageApi'
export * from './mypage/useMypageService'
export * from './teammate/teammateApi'
export * from './teammate/useTeammateService'
