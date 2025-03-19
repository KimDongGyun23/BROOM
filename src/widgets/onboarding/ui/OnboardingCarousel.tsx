import { styled } from 'styled-components'

import { useCarousel } from '@/widgets/onboarding/hook/useCarousel'

import { useMouseEvent } from '../hook/useMouseEvent'
import { useTouchEvent } from '../hook/useTouchEvent'

import { DotIndicator } from './DotIndicator'

import onboarding_first from '/assets/onboarding/onboarding1.webp'
import onboarding_second from '/assets/onboarding/onboarding2.webp'
import onboarding_third from '/assets/onboarding/onboarding3.webp'

const onboardingImages = [onboarding_first, onboarding_second, onboarding_third]

export const OnboardingCarousel = () => {
  const { currentTab, carouselRef, onDotClick } = useCarousel()

  const mouseEventHandlers = useMouseEvent(currentTab, onboardingImages.length, onDotClick)
  const touchEventHandlers = useTouchEvent(currentTab, onboardingImages.length, onDotClick)

  return (
    <>
      <Container ref={carouselRef} {...mouseEventHandlers} {...touchEventHandlers}>
        {onboardingImages.map((image, index) => (
          <Slide key={index}>
            <img src={image} alt={`onboarding-${index}`} fetchPriority="high" />
          </Slide>
        ))}
      </Container>
      <DotIndicator currentTab={currentTab} onDotClick={onDotClick} />
    </>
  )
}

const Container = styled.div`
  display: flex;
  overflow: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  margin: 0 70px;
`

const Slide = styled.div`
  ${({ theme }) => theme.flexBox('row', 'flex-end')};
  width: 100%;
  flex-shrink: 0;
`
