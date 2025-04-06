import { FormProvider } from 'react-hook-form'

import { newPasswordSchema } from '@/entities/mypage/config/password.schema'
import type { NewPasswordForm } from '@/entities/mypage/model/mypage.type'
import { UpdatePasswordForm } from '@/features/account/update-password/ui/UpdatePasswordForm'
import { UpdatePasswordHeader } from '@/features/account/update-password/ui/UpdatePasswordHeader'
import { UpdatePasswordSuccessModal } from '@/features/account/update-password/ui/UpdatePasswordSuccessModal'
import { useCustomForm } from '@/shared/hook/useCustomForm'

export const UpdatePassword = () => {
  const formMethod = useCustomForm<NewPasswordForm>(newPasswordSchema)

  return (
    <FormProvider {...formMethod}>
      <UpdatePasswordHeader />
      <UpdatePasswordForm />

      <UpdatePasswordSuccessModal />
    </FormProvider>
  )
}
