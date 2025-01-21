import { FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { useLoginForm } from '@/hooks/useForm'
import { useLoginLogic } from '@/services/service/useLoginLogic'
import { FORM_ATTRIBUTE } from '@/utils/constants'

export const LoginPage = () => {
  const formMethod = useLoginForm()

  const { handleSubmit } = formMethod
  const { isLoginFailed, handleLogin } = useLoginLogic()

  return (
    <Container>
      <Logo>BROOM</Logo>

      <FormProvider {...formMethod}>
        <StyledForm onSubmit={handleSubmit(handleLogin)}>
          <InputGroup section={FORM_ATTRIBUTE.LOGIN_ID.section}>
            <InputGroup.Label label={FORM_ATTRIBUTE.LOGIN_ID.label} />
            <InputGroup.Input {...FORM_ATTRIBUTE.LOGIN_ID.input} />
          </InputGroup>

          <InputGroup section={FORM_ATTRIBUTE.LOGIN_PASSWORD.section}>
            <InputGroup.Label label={FORM_ATTRIBUTE.LOGIN_PASSWORD.label} />
            <InputGroup.Input {...FORM_ATTRIBUTE.LOGIN_PASSWORD.input} />
          </InputGroup>

          <Button size="lg" type="submit">
            로그인
          </Button>
        </StyledForm>
      </FormProvider>

      <BottomContainer $isLoginFailed={isLoginFailed}>
        {isLoginFailed && <ErrorMessage>* 아이디 또는 비밀번호가 일치하지 않습니다.</ErrorMessage>}
        <SignUpLink to={'/sign-up'}>회원가입</SignUpLink>
      </BottomContainer>
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column')};
`

const Logo = styled.h1`
  margin-top: 20svh;
  text-align: center;
  font-family: 'jalnan', sans-serif;
  font-size: 60px;
  line-height: 44px;
  color: ${({ theme }) => theme.colors.black[600]};
`

const StyledForm = styled.form`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, '22px')};
  margin: 15svh ${({ theme }) => theme.gap.xl} 0;
`

const BottomContainer = styled.div<{ $isLoginFailed: boolean }>`
  margin: 22px ${({ theme }) => theme.gap.xl} 0;
  ${({ theme, $isLoginFailed }) =>
    theme.flexBox('row', 'center', $isLoginFailed ? 'space-between' : 'flex-end')};
`

const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSize[900]};
  line-height: ${({ theme }) => theme.lineHeight[900]};
  color: ${({ theme }) => theme.colors.error};
`

const SignUpLink = styled(Link)`
  display: inline-block;
  border-bottom: 2px solid ${({ theme }) => theme.colors.black[500]};
  color: ${({ theme }) => theme.colors.black[500]};
`
