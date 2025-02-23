import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Container, FormContainer } from '@/app/style/commonStyles'
import { SignupOneStep } from '@/components/domain/auth/SignupOneStep'
import { SignupThirdStep } from '@/components/domain/auth/SignupThirdStep'
import { SignupTwoStep } from '@/components/domain/auth/SignupTwoStep'
import { useSignupForm } from '@/forms/useSignupForm'
import { LabelWithStep } from '@/shared/ui/LabelWithStep'
import { SubHeaderWithIcon } from '@/shared/ui/SubHeader'
import { useCurrentStep, useStepsActions } from '@/stores/steps'

const signupMap = {
  1: '계정 정보 기입',
  2: '회원 정보 기입',
  3: '약관 동의',
} as const

const CurrentStepForm = () => {
  const currentStep = useCurrentStep()

  switch (currentStep) {
    case 1:
      return <SignupOneStep />
    case 2:
      return <SignupTwoStep />
    case 3:
      return <SignupThirdStep />
    default:
      return null
  }
}

export const SignupPage = () => {
  const navigate = useNavigate()
  const { formMethod, onSubmit } = useSignupForm()

  const currentStep = useCurrentStep()
  const { goPreviousStep, resetStep } = useStepsActions()

  const handleClose = () => navigate('/login')

  useEffect(() => {
    resetStep(Object.keys(signupMap).length)
  }, [resetStep])

  return (
    <Container>
      <SubHeaderWithIcon
        type="close"
        onClickCancel={currentStep === 1 ? handleClose : goPreviousStep}
        onClickClose={handleClose}
      />
      <LabelWithStep label={signupMap[currentStep as keyof typeof signupMap]} />
      <FormProvider {...formMethod}>
        <FormContainer onSubmit={onSubmit} $isFull>
          <CurrentStepForm />
        </FormContainer>
      </FormProvider>
    </Container>
  )
}
