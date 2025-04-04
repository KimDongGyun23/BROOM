import { useFormContext } from 'react-hook-form'

import { signupAttribute } from '@/entities/auth/config/auth.schema'
import { useNicknameUniqueState } from '@/features/check-duplication/model/duplication.store'
import { useStepsActions } from '@/features/signup/model/steps.store'

export const useSignupTwoStepNext = () => {
  const { trigger } = useFormContext()

  const { goNextStep } = useStepsActions()

  const isNicknameUnique = useNicknameUniqueState()

  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = signupAttribute

  const handleNextStep = async () => {
    const isValid = await trigger([
      NICKNAME.section,
      DISCHARGE_YEAR.section,
      MILITARY_BRANCH.section,
    ])
    if (isValid && isNicknameUnique) goNextStep()
  }

  return { handleNextStep }
}
