import { FormProvider } from 'react-hook-form'

import { FormContainer } from '@/app/style/commonStyles'
import { loginAttribute } from '@/entities/auth/config/login.attribute'
import { loginSchema } from '@/entities/auth/config/login.schema'
import type { LoginCredentials } from '@/entities/auth/model/auth.type'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { InputGroup } from '@/shared/ui/inputGroup'

import { LoginButton } from './LoginButton'

export const LoginForm = () => {
  const { ID, PASSWORD } = loginAttribute

  const formMethod = useCustomForm<LoginCredentials>(loginSchema)

  return (
    <FormProvider {...formMethod}>
      <FormContainer>
        <InputGroup section={ID.section}>
          <InputGroup.Label label={ID.label} />
          <InputGroup.Input {...ID.input} />
        </InputGroup>

        <InputGroup section={PASSWORD.section}>
          <InputGroup.Label label={PASSWORD.label} />
          <InputGroup.PasswordInput {...PASSWORD.input} />
        </InputGroup>

        <LoginButton />
      </FormContainer>
    </FormProvider>
  )
}
