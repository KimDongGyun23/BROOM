import { HttpClient } from './HttpClient'

const BASE_URL = import.meta.env.VITE_PUBLIC_SERVER_DOMAIN

export const api = new HttpClient({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
