import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '@/shared/ui/Button'
import { OnboardingCarousel } from '@/widgets/onboarding/ui/OnboardingCarousel'

export const Onboarding = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <CarouselContainer>
        <OnboardingCarousel />
      </CarouselContainer>

      <ButtonContainer>
        <StyledButton size="lg" onClick={() => navigate('/home')}>
          시작하기
        </StyledButton>
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column', 'center')};
  height: 100%;
`

const CarouselContainer = styled.div`
  ${({ theme }) => theme.flexBox('column', 'center', 'center')};
  width: 100%;
  flex: 1;
`

const ButtonContainer = styled.div`
  ${({ theme }) => theme.margin('xs', 0, 'xl')};
  ${({ theme }) => theme.padding(0, 'lg')};
  flex-shrink: 0;
  width: 100%;
`

const StyledButton = styled(Button)`
  width: 100%;
`
