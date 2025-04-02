import type { FallbackProps } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { ErrorButtonLabels, getErrorMessage } from '@/shared/lib/getErrorMessage'
import { Button } from '@/shared/ui/Button'

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate()

  const { status } = error?.response || -1
  const { title, content, buttonLabel } = getErrorMessage(status)

  const handleClickGoHome = () => {
    resetErrorBoundary()
    navigate('/home')
  }

  const handleClickPrimaryButton = () => {
    if (buttonLabel === ErrorButtonLabels.LOGIN) {
      resetErrorBoundary()
      navigate('/login')
    } else {
      resetErrorBoundary()
    }
  }

  return (
    <Container>
      <ContentWrapper className="flex-column-align min-w-[260px] gap-8">
        <TextContainer>
          <h2 className="error-title">{title}</h2>
          <p className="error-message">{content}</p>
        </TextContainer>
        <ButtonContainer>
          <Button size="lg" secondary onClick={handleClickGoHome}>
            홈으로 가기
          </Button>

          <Button size="lg" onClick={handleClickPrimaryButton}>
            {buttonLabel}
          </Button>
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
`

const TextContainer = styled.div`
  ${({ theme }) => theme.flexBox('column', 'center', undefined, 'xl')}

  .error-title {
    font-family: 'Jalnan', sans-serif;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.black[600]};
  }

  .error-message {
    ${({ theme }) => theme.font(700, theme.colors.black[500])};
    text-align: center;
    white-space: pre-wrap;
  }
`

const ButtonContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'lg')}
  width: 100%;
  padding-top: 80px;

  & > button {
    flex-grow: 1;
  }
`
