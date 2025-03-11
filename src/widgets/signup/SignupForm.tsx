import { useFormContext } from 'react-hook-form'

import { FormContainer } from '@/app/style/commonStyles'
import type { SignupData } from '@/entities/auth/model/auth.type'
import { useSignup } from '@/features/signup/hook/useSignupForm'
import { useCurrentStep } from '@/features/signup/model/steps.store'

import { SignupOneStep } from './SignupOneStep'
import { SignupThirdStep } from './SignupThirdStep'
import { SignupTwoStep } from './SignupTwoStep'

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

export const SignupForm = () => {
  const { handleSignup } = useSignup()

  const { handleSubmit } = useFormContext<SignupData>()

  return (
    <FormContainer onSubmit={handleSubmit(handleSignup)} $isFull>
      <CurrentStepForm />
    </FormContainer>
  )
}
