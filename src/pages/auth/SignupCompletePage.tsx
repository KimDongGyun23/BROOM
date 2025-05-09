import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '@/shared/ui/Button'

export const SignupCompletePage = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Logo>BROOM</Logo>
      <Message>회원가입이 완료되었습니다.</Message>
      <StyledButton size="lg" onClick={() => navigate('/login')}>
        로그인 페이지로 이동
      </StyledButton>
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`

const Logo = styled.h1`
  ${({ theme }) => theme.margin('logo-lg-top', 'container', 'logo-lg-bottom')};
  text-align: center;
  font-family: 'Jalnan', sans-serif;
  font-size: 60px;
  line-height: 44px;
  color: ${({ theme }) => theme.colors.black[600]};
`

const Message = styled.p`
  ${({ theme }) => theme.margin(0, 'container', 0, 'container')};
  ${({ theme }) => theme.font(600, theme.colors.black[500])};
  text-align: center;
`

const StyledButton = styled(Button)`
  ${({ theme }) => theme.margin('auto', 'container', '4xl')};
`
