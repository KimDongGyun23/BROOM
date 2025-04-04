import { FormProvider } from 'react-hook-form'

import type { NewPasswordForm } from '@/entities/mypage/model/mypage.type'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { newPasswordSchema } from '@/widgets/form/schema/password.schema'
import { UpdatePasswordForm } from '@/widgets/form/UpdatePasswordForm'
import { UpdatePasswordHeader } from '@/widgets/header/UpdatePasswordHeader'

export const PasswordUpdate = () => {
  const formMethod = useCustomForm<NewPasswordForm>(newPasswordSchema)

  return (
    <FormProvider {...formMethod}>
      <UpdatePasswordHeader />
      <UpdatePasswordForm />
    </FormProvider>
  )
}
