import { FormProvider } from 'react-hook-form'

import { Container } from '@/app/style/commonStyles'
import { signupSchema } from '@/entities/auth/config/auth.schema'
import type { SignupData } from '@/entities/auth/model/auth.type'
import { LabelWithStep } from '@/features/auth/signup/ui/LabelWithStep'
import { SignupForm } from '@/features/auth/signup/ui/SignupForm'
import { SignupHeader } from '@/features/auth/signup/ui/SignupHeader'
import { useCustomForm } from '@/shared/hook/useCustomForm'

export const SignupPage = () => {
  const formMethod = useCustomForm<SignupData>(signupSchema)

  return (
    <Container>
      <SignupHeader />
      <LabelWithStep />

      <FormProvider {...formMethod}>
        <SignupForm />
      </FormProvider>
    </Container>
  )
}
