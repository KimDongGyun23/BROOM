import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { SignupOneStep } from '@/components/domain/auth/SignupOneStep'
import { SignupThirdStep } from '@/components/domain/auth/SignupThirdStep'
import { SignupTwoStep } from '@/components/domain/auth/SignupTwoStep'
import { LabelWithStep } from '@/components/view/LabelWithStep'
import { SubHeaderWithIcon } from '@/components/view/SubHeader'
import { useCustomForm } from '@/hooks/useCustomForm'
import { useSignup } from '@/services/query/useAuthQuery'
import { useCurrentStep, useStepsActions } from '@/stores/steps'
import { Container, FormContainer } from '@/styles/commonStyles'
import type { SignupData } from '@/types/auth'
import { signupSchema } from '@/utils/schema'

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

const useSignupForm = () => {
  const navigate = useNavigate()
  const { mutate: signupMutation } = useSignup()
  const formMethod = useCustomForm<SignupData>(signupSchema)
  const { handleSubmit } = formMethod

  const handleSubmitSignupForm = (formData: SignupData) => {
    const { confirm: _confirm, ...dataWithoutConfirm } = formData
    signupMutation({ body: dataWithoutConfirm }, { onSuccess: () => navigate('/sign-up/complete') })
  }

  return { formMethod, onSubmit: handleSubmit(handleSubmitSignupForm) }
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
