import { FormProvider } from 'react-hook-form'

import { Container } from '@/app/style/commonStyles'
import { signupSchema } from '@/entities/auth/config/auth.schema'
import type { SignupData } from '@/entities/auth/model/auth.type'
import { signupMap, useCurrentStep } from '@/features/signup/model/steps.store'
import { SignupForm } from '@/features/signup/ui/SignupForm'
import { SignupHeader } from '@/features/signup/ui/SignupHeader'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { LabelWithStep } from '@/shared/ui/LabelWithStep'

export const SignupPage = () => {
  const formMethod = useCustomForm<SignupData>(signupSchema)

  const currentStep = useCurrentStep()

  return (
    <Container>
      <SignupHeader />
      <LabelWithStep label={signupMap[currentStep as keyof typeof signupMap]} />

      <FormProvider {...formMethod}>
        <SignupForm />
      </FormProvider>
    </Container>
  )
}
