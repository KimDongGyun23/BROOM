import { FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Container, FormContainer } from '@/app/style/commonStyles'
import { loginAttribute, loginSchema } from '@/entities/auth/config/auth.schema'
import type { LoginCredentials } from '@/entities/auth/model/auth.type'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { InputGroup } from '@/shared/ui/inputGroup'
import { LoginButton } from '@/widgets/button/LoginButton'

export const LoginPage = () => {
  const formMethod = useCustomForm<LoginCredentials>(loginSchema, {
    defaultValues: {
      userId: 'test01',
      password: 'password',
    },
  })

  const { ID, PASSWORD } = loginAttribute

  return (
    <Container>
      <Logo>BROOM</Logo>

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

      <SignUpLink to={'/sign-up'}>회원가입</SignUpLink>
    </Container>
  )
}

const Logo = styled.h1`
  ${({ theme }) => `
    ${theme.margin('logo-sm', 'container')}
    color: ${theme.colors.black[600]};
  `}
  text-align: center;
  font-family: 'Jalnan', sans-serif;
  font-size: 60px;
  line-height: 44px;
`

const SignUpLink = styled(Link)`
  ${({ theme }) => `
    ${theme.margin(0, 'lg', 0, 0)}
    ${theme.border('underline', 'bottom')}
    ${theme.font(800, theme.colors.black[500])}
  `}
  align-self: flex-end;
`
