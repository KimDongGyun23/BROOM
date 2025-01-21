import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import onboarding_first from '@/assets/onboarding1.svg'
import onboarding_second from '@/assets/onboarding2.svg'
import onboarding_third from '@/assets/onboarding3.svg'
import { Button } from '@/components/view/Button'
import { useTouchEvent } from '@/hooks/useTouchEvent'

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column', 'center')};
  height: 100%;
`

const CarouselContainer = styled.div`
  ${({ theme }) => theme.flexBox('column', 'center', 'center')};
  flex: 1;
`

const Carousel = styled.div`
  display: flex;
  overflow: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  margin: 0 70px;
`

const CarouselItem = styled.div`
  display: flex;
  width: 100%;
  flex-shrink: 0;
  align-items: flex-end;
`

const DotContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.gap.md};
  margin-top: 24px;
`

const Dot = styled.button<{ $isActive: boolean }>`
  width: ${({ $isActive }) => ($isActive ? '24px' : '8px')};
  height: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  opacity: ${({ $isActive }) => ($isActive ? '0.9' : '0.5')};
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.black[600] : theme.colors.black[200]};
  cursor: pointer;
`

const ButtonContainer = styled.div`
  flex-shrink: 0;
  width: 100%;
  margin: ${({ theme }) => theme.gap.xxl} 0;
  padding: ${({ theme }) => `40px ${theme.gap.xl}`};
  padding-top: ${({ theme }) => theme.gap.xs};
`

const StyledButton = styled(Button)`
  width: 100%;
`

type SectionDotType = {
  currentTab: number
  onDotClick: (index: number) => void
}

const onboardingData = [onboarding_first, onboarding_second, onboarding_third]

const SectionDot = ({ currentTab, onDotClick }: SectionDotType) => {
  return (
    <DotContainer>
      {[...Array(3)].map((_, index) => (
        <Dot key={index} $isActive={index === currentTab} onClick={() => onDotClick(index)} />
      ))}
    </DotContainer>
  )
}

export const Onboarding = () => {
  const navigate = useNavigate()
  const { currentTab, carouselRef, onDotClick, ...event } = useTouchEvent()

  return (
    <Container>
      <CarouselContainer>
        <Carousel ref={carouselRef} {...event}>
          {onboardingData.map((image, index) => (
            <CarouselItem key={index}>
              <img src={image} alt={`onboarding-${index}`} />
            </CarouselItem>
          ))}
        </Carousel>

        <SectionDot currentTab={currentTab} onDotClick={onDotClick} />
      </CarouselContainer>

      <ButtonContainer>
        <StyledButton size="lg" onClick={() => navigate('/home')}>
          시작하기
        </StyledButton>
      </ButtonContainer>
    </Container>
  )
}
