import { FormProvider } from 'react-hook-form'

import { FormContainer } from '@/app/style/commonStyles'
import type { LoginCredentials } from '@/entities/auth/model/auth.type'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { InputGroup } from '@/shared/ui/inputGroup'

import { LoginButton } from '../button/LoginButton'

import { loginAttribute, loginSchema } from './schema/login.schema'

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
          <InputGroup.Input {...PASSWORD.input} />
        </InputGroup>

        <LoginButton />
      </FormContainer>
    </FormProvider>
  )
}
