import { useFormContext } from 'react-hook-form'

import { signupAttribute } from '@/entities/auth/config/auth.schema'
import {
  useNicknameDuplicationCheckActions,
  useNicknameUniqueState,
} from '@/features/check-duplication/model/duplication.store'
import { useStepsActions } from '@/features/signup/model/steps.store'

export const useSignupTwoStepNext = () => {
  const { trigger, setError, clearErrors } = useFormContext()

  const { goNextStep } = useStepsActions()

  const isNicknameUnique = useNicknameUniqueState()

  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = signupAttribute

  const { clearDuplicationCheckState } = useNicknameDuplicationCheckActions()

  const handleNextStep = async () => {
    if (isNicknameUnique === null) {
      setError(NICKNAME.section, {
        type: 'manual',
        message: '닉네임 중복 검사를 진행해주세요.',
      })
      return
    }

    const isValid = await trigger([
      NICKNAME.section,
      DISCHARGE_YEAR.section,
      MILITARY_BRANCH.section,
    ])

    if (isValid && isNicknameUnique) {
      clearErrors(NICKNAME.section)
      clearDuplicationCheckState()
      goNextStep()
    }
  }

  return { handleNextStep }
}
