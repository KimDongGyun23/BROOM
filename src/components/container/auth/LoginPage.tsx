import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { useCustomForm } from '@/hooks/useCustomForm'
import { instance } from '@/services/query'
import { useLogin } from '@/services/query/useAuthQuery'
import { Container, FormContainer } from '@/styles/commonStyles'
import type { LoginCredentials } from '@/types/auth'
import { FORM_ATTRIBUTE, loginSchema } from '@/utils/schema'
import { SESSION_KEYS, setSessionStorageItem } from '@/utils/storage'

const useLoginState = () => {
  const navigate = useNavigate()
  const [isLoginFailed, setIsLoginFailed] = useState(false)
  const { mutate: login } = useLogin()

  const handleLogin = (formData: LoginCredentials) => {
    login(
      { body: { ...formData } },
      {
        onSuccess: ({ headers, data }) => {
          if (headers.authorization) {
            instance.setAccessToken(headers.authorization)
            setIsLoginFailed(false)
            setSessionStorageItem(SESSION_KEYS.LOGIN, 'true')
            setSessionStorageItem(SESSION_KEYS.NICKNAME, data.nickname)
            setSessionStorageItem(SESSION_KEYS.MILITARY_BRANCHES, data.militaryBranch)
            navigate('/home', { replace: true })
          }
        },
        onError: () => setIsLoginFailed(true),
      },
    )
  }

  return { isLoginFailed, handleLogin }
}

export const LoginPage = () => {
  const { isLoginFailed, handleLogin } = useLoginState()
  const formMethod = useCustomForm<LoginCredentials>(loginSchema, {
    defaultValues: {
      userId: 'test01',
      password: 'password',
    },
  })

  const { handleSubmit } = formMethod

  return (
    <Container>
      <Logo>BROOM</Logo>

      <FormProvider {...formMethod}>
        <FormContainer onSubmit={handleSubmit(handleLogin)}>
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
  font-family: 'jalnan', sans-serif;
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
