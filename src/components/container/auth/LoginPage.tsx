import { FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Container, FormContainer } from '@/app/style/commonStyles'
import { loginAttribute, useLoginForm } from '@/forms/useLoginForm'
import { Button } from '@/shared/ui/Button'
import { InputGroup } from '@/shared/ui/inputGroup'

export const LoginPage = () => {
  const { ID, PASSWORD } = loginAttribute
  const { formMethod, onSubmit, isLoginFailed } = useLoginForm()

  return (
    <Container>
      <Logo>BROOM</Logo>

      <FormProvider {...formMethod}>
        <FormContainer onSubmit={onSubmit}>
          <InputGroup section={ID.section}>
            <InputGroup.Label label={ID.label} />
            <InputGroup.Input {...ID.input} />
          </InputGroup>

          <InputGroup section={PASSWORD.section}>
            <InputGroup.Label label={PASSWORD.label} />
            <InputGroup.Input {...PASSWORD.input} />
          </InputGroup>

          <Button size="lg" type="submit">
            로그인
          </Button>
        </FormContainer>
      </FormProvider>

      <BottomContainer $isLoginFailed={isLoginFailed}>
        {isLoginFailed && <ErrorMessage>* 아이디 또는 비밀번호가 일치하지 않습니다.</ErrorMessage>}
        <SignUpLink to={'/sign-up'}>회원가입</SignUpLink>
      </BottomContainer>
    </Container>
  )
}

const Logo = styled.h1`
  ${({ theme }) => theme.margin('logo-sm', 'container')};
  text-align: center;
  font-family: 'Jalnan2', sans-serif;
  font-size: 60px;
  line-height: 44px;
  color: ${({ theme }) => theme.colors.black[600]};
`

const BottomContainer = styled.div<{ $isLoginFailed: boolean }>`
  ${({ theme, $isLoginFailed }) =>
    theme.flexBox('row', 'center', $isLoginFailed ? 'space-between' : 'flex-end')};
  ${({ theme }) => theme.margin('xl', 'container', 0)};
`

const ErrorMessage = styled.p`
  ${({ theme }) => theme.font(900, theme.colors.error)};
`

const SignUpLink = styled(Link)`
  ${({ theme }) => theme.border('underline', 'bottom')};
  color: ${({ theme }) => theme.colors.black[500]};
`
