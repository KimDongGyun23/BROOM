import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { signupAttribute } from '@/entities/auth/config/auth.schema'
import { useNicknameUniqueState } from '@/features/check-nickname-duplication/model/nicknameDuplicationCheck.store'
import { useStepsActions } from '@/shared/model/steps.store'

export const useSignupTwoStepNext = () => {
  const { trigger } = useFormContext()
  const { goNextStep } = useStepsActions()
  const isNicknameUnique = useNicknameUniqueState()
  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = signupAttribute

  const handleNextStep = useCallback(async () => {
    const isValid = await trigger([
      NICKNAME.section,
      DISCHARGE_YEAR.section,
      MILITARY_BRANCH.section,
    ])
    if (isValid && isNicknameUnique) goNextStep()
  }, [
    trigger,
    NICKNAME.section,
    DISCHARGE_YEAR.section,
    MILITARY_BRANCH.section,
    isNicknameUnique,
    goNextStep,
  ])

  return { handleNextStep }
}
