import { useFormContext } from 'react-hook-form'

import { signupAttribute } from '@/entities/auth/config/auth.schema'
import { useIdUniqueState } from '@/features/check-duplication/model/duplication.store'
import { useStepsActions } from '@/features/signup/model/steps.store'

export const useSignupOneStepNext = () => {
  const { trigger } = useFormContext()

  const { goNextStep } = useStepsActions()

  const isIdUnique = useIdUniqueState()

  const { ID, PASSWORD, CONFIRM } = signupAttribute

  const handleNextStep = async () => {
    const isValid = await trigger([ID.section, PASSWORD.section, CONFIRM.section])
    if (isValid && isIdUnique) goNextStep()
  }

  return { handleNextStep }
}
