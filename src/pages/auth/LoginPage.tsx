import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { LoginForm } from '@/features/auth/login/ui/LoginForm'

export const LoginPage = () => {
  return (
    <Container>
      <Logo>BROOM</Logo>
      <LoginForm />
      <LinkToSignUpPage to={'/sign-up'}>회원가입</LinkToSignUpPage>
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

const LinkToSignUpPage = styled(Link)`
  ${({ theme }) => `
    ${theme.margin(0, 'lg', 0, 0)}
    ${theme.border('underline', 'bottom')}
    ${theme.font(800, theme.colors.black[500])}
  `}
  align-self: flex-end;
`
