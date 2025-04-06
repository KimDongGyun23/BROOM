import { useFormContext } from 'react-hook-form'

import { signupAttribute } from '@/entities/auth/config/auth.schema'

import {
  useNicknameDuplicationCheckActions,
  useNicknameUniqueState,
} from '../../check-duplication/model/duplication.store'
import { validateStepTwo } from '../lib/validateStepTwo'

import { useStepsActions } from './steps.store'

export const useMoveToThirdStep = () => {
  const isNicknameUnique = useNicknameUniqueState()

  const { trigger, setError, clearErrors } = useFormContext()

  const { goNextStep } = useStepsActions()
  const { clearDuplicationCheckState } = useNicknameDuplicationCheckActions()

  const handleNextStep = async () => {
    const validation = await validateStepTwo(trigger, isNicknameUnique)

    if (!validation.isValid && validation.errorField) {
      setError(validation.errorField, {
        type: 'manual',
        message: '닉네임 중복 검사를 진행해주세요.',
      })
      return
    }

    clearErrors(signupAttribute.NICKNAME.section)
    clearDuplicationCheckState()
    goNextStep()
  }

  return { handleNextStep }
}
