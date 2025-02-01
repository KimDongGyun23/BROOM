import type { AxiosError } from 'axios'

import type { PasswordUpdateForm } from '@/types/mypage'

import { useUpdatePassword } from '../query/useMypageQuery'

type ReturnType = (onSuccess: (message: string) => void) => {
  handlePasswordUpdate: (formData: PasswordUpdateForm) => void
}

export const usePasswordUpdate: ReturnType = (onSuccess) => {
  const { mutate: updatePassword } = useUpdatePassword()

  const handlePasswordUpdate = (formData: PasswordUpdateForm) => {
    updatePassword(
      { body: { password: formData.password, newPassword: formData.newPassword } },
      {
        onSuccess: (res) => {
          onSuccess(res)
        },
        onError: (error) => {
          const errorMessage =
            ((error as AxiosError).response?.data as string) === '기존 비밀번호가 일치하지 않습니다'
              ? '기존 비밀번호가 일치하지 않습니다.'
              : '네트워크 오류가 발생했습니다.'
          onSuccess(errorMessage)
        },
      },
    )
  }

  return { handlePasswordUpdate }
}
