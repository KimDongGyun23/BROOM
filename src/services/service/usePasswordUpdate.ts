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
        onSuccess: (response) => onSuccess(response.data),
        onError: (error) => onSuccess(error.response?.data as string),
      },
    )
  }

  return { handlePasswordUpdate }
}
