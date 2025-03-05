import { FormProvider } from 'react-hook-form'

import { Container } from '@/app/style/commonStyles'
import { signupSchema } from '@/entities/auth/config/auth.schema'
import type { SignupData } from '@/entities/auth/model/auth.type'
import { SignupHeader } from '@/features/signup/ui/SignupHeader'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { useCurrentStep } from '@/shared/model/steps.store'
import { LabelWithStep } from '@/shared/ui/LabelWithStep'
import { SignupForm } from '@/widgets/signup-step/ui/SignupForm'

const signupMap = {
  1: '계정 정보 기입',
  2: '회원 정보 기입',
  3: '약관 동의',
} as const

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
