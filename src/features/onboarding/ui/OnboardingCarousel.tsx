import { styled } from 'styled-components'

import { useCarousel } from '../model/useCarousel'
import { useMouseEvent } from '../model/useMouseEvent'
import { useTouchEvent } from '../model/useTouchEvent'

import { DotIndicator } from './DotIndicator'
import { FirstOnboarding } from './FirstOnboarding'
import { SecondOnboarding } from './SecondOnboarding'
import { ThirdOnboarding } from './ThirdOnboarding'

const onboardingImages = [FirstOnboarding, SecondOnboarding, ThirdOnboarding]

export const OnboardingCarousel = () => {
  const { currentTab, carouselRef, onDotClick } = useCarousel()

  const mouseEventHandlers = useMouseEvent(currentTab, onboardingImages.length, onDotClick)
  const touchEventHandlers = useTouchEvent(currentTab, onboardingImages.length, onDotClick)

  return (
    <>
      <Container ref={carouselRef} {...mouseEventHandlers} {...touchEventHandlers}>
        {onboardingImages.map((Component, index) => (
          <Slide key={index}>
            <Component />
          </Slide>
        ))}
      </Container>
      <DotIndicator currentTab={currentTab} onDotClick={onDotClick} />
    </>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  overflow: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
`

const Slide = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'center')};
  width: 100%;
  flex-shrink: 0;
`
