import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '@/components/view/Button'

export const ErrorPage = () => {
  const navigate = useNavigate()
  const goToHome = () => {
    navigate('/home', { replace: true })
  }

  return (
    <Container>
      <ContentWrapper className="flex-column-align min-w-[260px] gap-8">
        <h2 className="error-title">404</h2>
        <p className="error-message">{`현재 페이지가 존재하지 않아요...\n재시도 부탁드립니다.`}</p>
        <ButtonContainer>
          <StyledButton size="lg" onClick={goToHome}>
            홈으로 이동하기
          </StyledButton>
        </ButtonContainer>
      </ContentWrapper>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  width: 100%;
  min-width: 320px;
  max-width: 450px;
  background-color: white;
  padding: 0 ${({ theme }) => theme.gap.xl};
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 260px;
  gap: 32px;

  .error-title {
    font-family: 'jalnan', sans-serif;
    font-size: 64px;
    color: ${({ theme }) => theme.colors.black[600]};
  }

  .error-message {
    font-size: ${({ theme }) => theme.fontSize[700]};
    line-height: ${({ theme }) => theme.lineHeight[700]};
    text-align: center;
    white-space: pre-wrap;
    color: ${({ theme }) => theme.colors.black[500]};
  }
`

const ButtonContainer = styled.div`
  width: 100%;
  padding-top: 80px;
`

const StyledButton = styled(Button)`
  width: 100%;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`
