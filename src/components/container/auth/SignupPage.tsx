import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { SignupOneStep } from '@/components/domain/auth/SignupOneStep'
import { SignupThirdStep } from '@/components/domain/auth/SignupThirdStep'
import { SignupTwoStep } from '@/components/domain/auth/SignupTwoStep'
import { useSignupForm } from '@/hooks/useForm'
import { useSignup } from '@/services/query/useAuthQuery'
import { useCurrentStep, useStepsActions } from '@/stores/steps'
import type { SignupData } from '@/types/auth'

const signupMap = {
  1: '계정 정보 기입',
  2: '회원 정보 기입',
  3: '약관 동의',
} as const

export const SignupPage = () => {
  const navigate = useNavigate()
  const formMethod = useSignupForm()
  const currentStep = useCurrentStep()

  const { setCurrentStep, setTotalStep } = useStepsActions()
  const { mutate: signupMutation } = useSignup()
  const { handleSubmit } = formMethod

  const handleSubmitSignupForm = (formData: SignupData) => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { confirm, ...dataWithoutConfirm } = formData
    signupMutation(
      { body: dataWithoutConfirm },
      {
        onSuccess: () => navigate('/sign-up/complete'),
      },
    )
  }

  useEffect(() => {
    setCurrentStep(1)
    setTotalStep(Object.keys(signupMap).length)
  }, [])

  return (
    <FormProvider {...formMethod}>
      <form onSubmit={handleSubmit(handleSubmitSignupForm)} className="flex-column h-svh">
        {currentStep === 1 && <SignupOneStep label={signupMap[1]} />}
        {currentStep === 2 && <SignupTwoStep label={signupMap[2]} />}
        {currentStep === 3 && <SignupThirdStep label={signupMap[3]} />}
      </form>
    </FormProvider>
  )
}
