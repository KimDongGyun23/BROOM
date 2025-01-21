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
  ${({ theme }) => theme.margin('xxl', 'container', 0, 'container')};
`

const Label = styled.h4`
  ${({ theme }) => theme.font(400, theme.colors.black[700])};
`

const StepIndicator = styled.p`
  ${({ theme }) => theme.font(900, theme.colors.black[500])};
`
