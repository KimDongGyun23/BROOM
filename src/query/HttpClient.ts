import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios'

import { clearSessionStorage } from '@/utils/storage'

import { reIssue } from './useAuthQuery'

export class HttpClient {
  private readonly client: AxiosInstance
  private accessToken: string | null = null

  constructor(config?: AxiosRequestConfig) {
    this.client = axios.create(config)

    this.onRequest = this.onRequest.bind(this)
    this.onResponse = this.onResponse.bind(this)
    this.onError = this.onError.bind(this)

    this.client.interceptors.request.use(this.onRequest, this.onError)
    this.client.interceptors.response.use(this.onResponse, this.onError)
  }

  setAccessToken(token: string) {
    this.accessToken = token
  }

  getAccessToken() {
    return this.accessToken
  }

  hasToken() {
    return !!this.accessToken
  }

  get<T>(...args: Parameters<typeof this.client.get>): Promise<T> {
    return this.client.get(...args)
  }

  post<T>(...args: Parameters<typeof this.client.post>): Promise<T> {
    return this.client.post(...args)
  }

  put<T>(...args: Parameters<typeof this.client.put>): Promise<T> {
    return this.client.put(...args)
  }

  patch<T>(...args: Parameters<typeof this.client.patch>): Promise<T> {
    return this.client.patch(...args)
  }

  delete<T>(...args: Parameters<typeof this.client.delete>): Promise<T> {
    return this.client.delete(...args)
  }

  private onRequest(config: InternalAxiosRequestConfig) {
    if (this.accessToken) {
      config.headers.Authorization = this.accessToken
    }
    return config
  }

  private onResponse(response: AxiosResponse) {
    return response.data
  }

  private async onError(error: AxiosError) {
    const response = error.response as AxiosResponse
    const originalRequest = error.config as InternalAxiosRequestConfig

    if (isAxiosError(error)) {
      // 토큰 재발급 임시 처리
      if (response?.status === 408) {
        try {
          const reIssueResponse = await reIssue()

          if (reIssueResponse && reIssueResponse.status === 200) {
            const retry = await this.client.request(originalRequest)
            return retry
          }
        } catch (reIssueError) {
          console.error('재발급 실패', reIssueError)
          clearSessionStorage()
          window.location.href = '/login'
        }
      }
    }

    return Promise.reject(error)
  }
}
