import styled from 'styled-components'

import {
  SIGNUP_STEPS,
  useCurrentStep,
  useTotalStep,
} from '@/features/auth/signup/model/steps.store'

export const LabelWithStep = () => {
  const currentStep = useCurrentStep()
  const totalStep = useTotalStep()

  const label = SIGNUP_STEPS[currentStep as keyof typeof SIGNUP_STEPS]

  return (
    <Container>
      <Label>{label}</Label>
      <StepIndicator aria-label={`총 ${totalStep} 단계 중 ${currentStep} 단계`}>
        {currentStep} / {totalStep}
      </StepIndicator>
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('row', 'flex-end', 'space-between')};
  ${({ theme }) => theme.margin('page-label')};
`

const Label = styled.h4`
  ${({ theme }) => theme.font(400, theme.colors.black[700])};
`

const StepIndicator = styled.p`
  ${({ theme }) => theme.font(900, theme.colors.black[500])};
`
