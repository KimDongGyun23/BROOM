import { instanceWithoutAuth } from '@/app/api/instanceWithoutAuth'

export const reIssue = async () => {
  try {
    const response = await instanceWithoutAuth.post<{ token: string; response: string }>(
      `/reissue`,
      null,
    )

    if (response) return response

    throw new Error('토큰 재발급 실패')
  } catch (error) {
    throw error
  }
}
