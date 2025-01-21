import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '@/components/view/Button'

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`

const Logo = styled.h1`
  margin-top: 30svh;
  text-align: center;
  font-family: 'jalnan', sans-serif;
  font-size: 60px;
  line-height: 44px;
  color: ${({ theme }) => theme.colors.black[600]};
`

const Message = styled.p`
  margin: 30px ${({ theme }) => theme.gap.xl} 0;
  ${({ theme }) => theme.font(600, theme.colors.black[500])};
  text-align: center;
`

const StyledButton = styled(Button)`
  margin: auto ${({ theme }) => theme.gap.xl} 40px;
`

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
