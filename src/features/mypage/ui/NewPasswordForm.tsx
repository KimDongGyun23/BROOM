import { FormProvider } from 'react-hook-form'

import { FormContainer } from '@/app/style/commonStyles'
import { InputGroup } from '@/shared/ui/inputGroup'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { usePasswordUpdateForm } from '../hook/usePasswordUpdateForm'
import { newPasswordAttribute } from '../model/mypage.schema'

export const NewPasswordForm = () => {
  const { formMethod, onSubmit } = usePasswordUpdateForm()
  const { PREV_PASSWORD, NEW_PASSWORD, CONFIRM } = newPasswordAttribute

  return (
    <>
      <SubHeaderWithoutIcon type="complete" title="비밀번호 재설정" onClickComplete={onSubmit} />

      <FormProvider {...formMethod}>
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
    </>
  )
}
