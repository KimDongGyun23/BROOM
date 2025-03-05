import { FormContainer } from '@/app/style/commonStyles'
import { useSignup } from '@/features/signup/hook/useSignupForm'
import { ModalStoreProvider } from '@/shared/model/modal.store'
import { useCurrentStep } from '@/shared/model/steps.store'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

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

const SignupFormWithModal = () => {
  const { onSubmit } = useSignup()

  return (
    <>
      <FormContainer onSubmit={onSubmit} $isFull>
        <CurrentStepForm />
      </FormContainer>
      <ModalWithOneButton />
    </>
  )
}

export const SignupForm = () => (
  <ModalStoreProvider>
    <SignupFormWithModal />
  </ModalStoreProvider>
)
