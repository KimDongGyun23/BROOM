import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '@/shared/ui/Button'

export const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <ContentWrapper className="flex-column-align min-w-[260px] gap-8">
        <h2 className="error-title">ERROR</h2>
        <p className="error-message">{`현재 페이지가 존재하지 않아요...\n재시도 부탁드립니다.`}</p>
        <ButtonContainer>
          <StyledButton size="lg" onClick={() => navigate('/home', { replace: true })}>
            홈으로 이동하기
          </StyledButton>
        </ButtonContainer>
      </ContentWrapper>
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.gridBox(undefined, undefined, 'center', 'center')};
  ${({ theme }) => theme.padding(0, 'md')};
  position: absolute;
  inset: 0;
  z-index: 50;
  width: 100%;
  min-width: 320px;
  max-width: 450px;
  background-color: white;
`

const ContentWrapper = styled.div`
  ${({ theme }) => theme.flexBox('column', 'center', undefined, '2xl')}
  min-width: 260px;

  .error-title {
    font-family: 'Jalnan', sans-serif;
    font-size: 64px;
    color: ${({ theme }) => theme.colors.black[600]};
  }

  .error-message {
    ${({ theme }) => theme.font(700, theme.colors.black[500])};
    text-align: center;
    white-space: pre-wrap;
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
