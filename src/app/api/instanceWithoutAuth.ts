import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_SERVER_DOMAIN,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

const onResponse = (response: AxiosResponse) => {
  const token = response.headers['authorization']
  if (token) return { token, ...response.data }

  return response.data
}
const onError = (error: AxiosError) => Promise.reject(error)

const get = <T>(...args: Parameters<typeof client.get>): Promise<T> => client.get(...args)
const post = <T>(...args: Parameters<typeof client.post>): Promise<T> => client.post(...args)
const put = <T>(...args: Parameters<typeof client.put>): Promise<T> => client.put(...args)
const patch = <T>(...args: Parameters<typeof client.patch>): Promise<T> => client.patch(...args)
const del = <T>(...args: Parameters<typeof client.delete>): Promise<T> => client.delete(...args)

client.interceptors.response.use(onResponse, onError)

export const instanceWithoutAuth = {
  get,
  post,
  put,
  patch,
  delete: del,
}
