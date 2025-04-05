import { FormProvider } from 'react-hook-form'

import type { NewPasswordForm } from '@/entities/mypage/model/mypage.type'
import { newPasswordSchema } from '@/features/update-password/config/password.schema'
import { UpdatePasswordForm } from '@/features/update-password/ui/UpdatePasswordForm'
import { UpdatePasswordHeader } from '@/features/update-password/ui/UpdatePasswordHeader'
import { useCustomForm } from '@/shared/hook/useCustomForm'

export const PasswordUpdate = () => {
  const formMethod = useCustomForm<NewPasswordForm>(newPasswordSchema)

  return (
    <FormProvider {...formMethod}>
      <UpdatePasswordHeader />
      <UpdatePasswordForm />
    </FormProvider>
  )
}
