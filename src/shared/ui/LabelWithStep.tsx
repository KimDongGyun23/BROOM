import styled from 'styled-components'

import { useCurrentStep, useTotalStep } from '@/features/signup/model/steps.store'

type LabelWithStepProps = {
  label: string
}

export const LabelWithStep = ({ label }: LabelWithStepProps) => {
  const currentStep = useCurrentStep()
  const totalStep = useTotalStep()

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
