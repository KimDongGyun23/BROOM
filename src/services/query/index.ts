import { HttpClient } from './HttpClient'

const BASE_URL = import.meta.env.VITE_PUBLIC_SERVER_DOMAIN

export const api = new HttpClient({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export * from './useAuthQuery'
export * from './useBusQuery'
export * from './useCarpoolQuery'
export * from './useChattingQuery'
export * from './useMypageQuery'
export * from './useTeammateQuery'
