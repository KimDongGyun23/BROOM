import type { AxiosError } from 'axios'

import type { NewPasswordFormType } from '@/types'

import { useUpdatePassword } from '../query'

type ReturnType = (onSuccess: (message: string) => void) => {
  handlePasswordUpdate: (formData: NewPasswordFormType) => void
}

export const usePasswordUpdate: ReturnType = (onSuccess) => {
  const { mutate: updatePassword } = useUpdatePassword()

  const handlePasswordUpdate = (formData: NewPasswordFormType) => {
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
