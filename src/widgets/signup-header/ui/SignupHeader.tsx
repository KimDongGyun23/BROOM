import { useNavigate } from 'react-router-dom'

import { useCurrentStep, useStepsActions } from '@/shared/model/steps.store'
import { SubHeaderWithIcon } from '@/shared/ui/SubHeader'

export const SignupHeader = () => {
  const navigate = useNavigate()
  const currentStep = useCurrentStep()
  const { goPreviousStep } = useStepsActions()

  const handleClose = () => navigate('/login')

  return (
    <SubHeaderWithIcon
      type="close"
      onClickCancel={currentStep === 1 ? handleClose : goPreviousStep}
      onClickClose={handleClose}
    />
  )
}
