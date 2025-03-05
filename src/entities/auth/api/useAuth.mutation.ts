import { instance, instanceWithoutAuth } from '@/app/api'

const ENDPOINTS = {
  reIssue: `/reissue`,
} as const

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
