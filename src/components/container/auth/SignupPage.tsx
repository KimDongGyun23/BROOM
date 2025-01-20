import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { SignupOneStep } from '@/components/domain/auth/SignupOneStep'
import { SignupThirdStep } from '@/components/domain/auth/SignupThirdStep'
import { SignupTwoStep } from '@/components/domain/auth/SignupTwoStep'
import { LabelWithStep } from '@/components/view/LabelWithStep'
import { SubHeaderWithIcon } from '@/components/view/SubHeader'
import { useSignupForm } from '@/hooks/useForm'
import { useSignup } from '@/services/query/useAuthQuery'
import { useCurrentStep, useStepsActions, useTotalStep } from '@/stores/steps'
import type { SignupData } from '@/types/auth'

const signupMap = {
  1: '계정 정보 기입',
  2: '회원 정보 기입',
  3: '약관 동의',
} as const

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100svh;
`

export const SignupPage = () => {
  const navigate = useNavigate()
  const formMethod = useSignupForm()
  const currentStep = useCurrentStep()
  const totalStep = useTotalStep()

  const { setCurrentStep, setTotalStep, goPreviousStep } = useStepsActions()
  const { mutate: signupMutation } = useSignup()
  const { handleSubmit, reset } = formMethod

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

  const handleClose = () => {
    navigate('/login')
    reset()
  }

  const renderStep = () => {
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

  useEffect(() => {
    setCurrentStep(1)
    setTotalStep(Object.keys(signupMap).length)
  }, [])

  return (
    <FormProvider {...formMethod}>
      <StyledForm onSubmit={handleSubmit(handleSubmitSignupForm)}>
        <SubHeaderWithIcon
          type="close"
          onClickCancel={currentStep === 1 ? handleClose : goPreviousStep}
          onClickClose={handleClose}
        />
        <LabelWithStep
          currentStep={currentStep}
          totalStep={totalStep}
          label={signupMap[currentStep as keyof typeof signupMap]}
        />
        {renderStep()}
      </StyledForm>
    </FormProvider>
  )
}
