import { instance, instanceWithoutAuth } from '@/app/api'

export const reIssue = async () => {
  try {
    const response = await instanceWithoutAuth.post(`/reissue`, null)
    const token = response.headers['authorization']

    if (token) {
      instance.setAccessToken(token)
      return token
    }

    throw new Error('토큰 재발급 실패')
  } catch (error) {
    console.error('재발급 요청 실패:', error)
    throw error
  }
}
