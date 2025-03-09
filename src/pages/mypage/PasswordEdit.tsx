import { FormProvider } from 'react-hook-form'

import { FormContainer } from '@/app/style/commonStyles'
import { newPasswordAttribute, newPasswordSchema } from '@/entities/mypage/model/mypage.schema'
import type { PasswordUpdateForm } from '@/entities/mypage/model/mypage.type'
import { PasswordEditHeader } from '@/features/edit-password/ui/PasswordEditHeader'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { InputGroup } from '@/shared/ui/inputGroup'

export const PasswordEdit = () => {
  const formMethod = useCustomForm<PasswordUpdateForm>(newPasswordSchema)

  const { PREV_PASSWORD, NEW_PASSWORD, CONFIRM } = newPasswordAttribute

  return (
    <FormProvider {...formMethod}>
      <PasswordEditHeader />
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
