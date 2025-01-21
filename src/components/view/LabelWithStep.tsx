import styled from 'styled-components'

type LabelWithStepProps = {
  currentStep: number
  totalStep: number
  label: string
}

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

const Container = styled.div`
  ${({ theme }) => theme.flexBox('row', 'flex-end', 'space-between')};
  margin: 24px ${({ theme }) => theme.gap.xl} 0;
`

const Label = styled.h4`
  font-size: ${({ theme }) => theme.fontSize[400]};
  line-height: ${({ theme }) => theme.lineHeight[400]};
  color: ${({ theme }) => theme.colors.black[700]};
`

const StepIndicator = styled.p`
  font-size: ${({ theme }) => theme.fontSize[900]};
  line-height: ${({ theme }) => theme.lineHeight[900]};
  color: ${({ theme }) => theme.colors.blue[500]};
`
