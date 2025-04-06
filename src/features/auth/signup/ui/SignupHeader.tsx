import { useNavigate } from 'react-router-dom'

import { SubHeaderWithIcon } from '@/shared/ui/SubHeader'

import { useCurrentStep, useStepsActions } from '../model/steps.store'

export const SignupHeader = () => {
  const navigate = useNavigate()
  const currentStep = useCurrentStep()

  const { goPreviousStep } = useStepsActions()

  const handleClose = () => {
    navigate('/login')
  }

  return (
    <SubHeaderWithIcon
      type="close"
      onClickCancel={currentStep === 1 ? handleClose : goPreviousStep}
      onClickClose={handleClose}
    />
  )
}
