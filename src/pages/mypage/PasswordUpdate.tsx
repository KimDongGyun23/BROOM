import { FormProvider } from 'react-hook-form'

import { FormContainer } from '@/app/style/commonStyles'
import { newPasswordAttribute, newPasswordSchema } from '@/entities/mypage/model/mypage.schema'
import type { UpdatePasswordForm } from '@/entities/mypage/model/mypage.type'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { InputGroup } from '@/shared/ui/inputGroup'
import { UpdatePasswordHeader } from '@/widgets/header/UpdatePasswordHeader'

export const PasswordUpdate = () => {
  const formMethod = useCustomForm<UpdatePasswordForm>(newPasswordSchema)

  const { PREV_PASSWORD, NEW_PASSWORD, CONFIRM } = newPasswordAttribute

  return (
    <FormProvider {...formMethod}>
      <UpdatePasswordHeader />
      <FormContainer>
        <InputGroup section={PREV_PASSWORD.section}>
          <InputGroup.Label label={PREV_PASSWORD.label} />
          <InputGroup.PasswordInput {...PREV_PASSWORD.input} />
        </InputGroup>

        <InputGroup section={NEW_PASSWORD.section}>
          <InputGroup.Label label={NEW_PASSWORD.label} />
          <InputGroup.PasswordInput {...NEW_PASSWORD.input} />
        </InputGroup>

        <InputGroup section={CONFIRM.section}>
          <InputGroup.Label label={CONFIRM.label} />
          <InputGroup.PasswordInput {...CONFIRM.input} />
        </InputGroup>
      </FormContainer>
    </FormProvider>
  )
}
