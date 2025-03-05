import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { signupAttribute } from '@/entities/auth/config/auth.schema'
import { useIdUniqueState } from '@/features/check-id-duplication/model/idDuplicationCheck.store'
import { useStepsActions } from '@/shared/model/steps.store'

export const useSignupOneStepNext = () => {
  const { trigger } = useFormContext()
  const { goNextStep } = useStepsActions()
  const isIdUnique = useIdUniqueState()
  const { ID, PASSWORD, CONFIRM } = signupAttribute

  const handleNextStep = useCallback(async () => {
    const isValid = await trigger([ID.section, PASSWORD.section, CONFIRM.section])
    if (isValid && isIdUnique) goNextStep()
  }, [trigger, ID.section, PASSWORD.section, CONFIRM.section, isIdUnique, goNextStep])

  return { handleNextStep }
}
