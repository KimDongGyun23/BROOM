import { FormContainer } from '@/app/style/commonStyles'
import { InputGroup } from '@/shared/ui/inputGroup'

import { newPasswordAttribute } from '../config/password.schema'

export const UpdatePasswordForm = () => {
  const { PREV_PASSWORD, NEW_PASSWORD, CONFIRM } = newPasswordAttribute

  return (
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
  )
}
