import styled from 'styled-components'

type LabelWithStepProps = {
  currentStep: number
  totalStep: number
  label: string
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: ${({ theme }) => `0 ${theme.gap.xl}`};
`

const Label = styled.h4`
  color: ${({ theme }) => theme.colors.black[700]};
`

const StepIndicator = styled.p`
  font-size: ${({ theme }) => theme.fontSize[900]};
  line-height: ${({ theme }) => theme.lineHeight[900]};
  color: ${({ theme }) => theme.colors.blue[500]};
`

export const LabelWithStep = ({ currentStep, totalStep, label }: LabelWithStepProps) => {
  return (
    <Container>
      <Label>{label}</Label>
      <StepIndicator aria-label={`총 ${totalStep} 단계 중 ${currentStep} 단계`}>
        {currentStep} / {totalStep}
      </StepIndicator>
    </Container>
  )
}
