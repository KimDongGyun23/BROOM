import { useFormContext } from 'react-hook-form'

import { signupAttribute } from '@/entities/auth/config/auth.schema'

import {
  useIdDuplicationCheckActions,
  useIdUniqueState,
} from '../../check-duplication/model/duplication.store'
import { validateStepOne } from '../lib/validateStepOne'

import { useStepsActions } from './steps.store'

export const useMoveToSecondStep = () => {
  const isIdUnique = useIdUniqueState()

  const { trigger, setError, clearErrors } = useFormContext()

  const { goNextStep } = useStepsActions()
  const { clearDuplicationCheckState } = useIdDuplicationCheckActions()

  const handleNextStep = async () => {
    const validation = await validateStepOne(trigger, isIdUnique)

    if (!validation.isValid && validation.errorField) {
      setError(validation.errorField, {
        type: 'manual',
        message: '아이디 중복 검사를 진행해주세요.',
      })
      return
    }

    clearErrors(signupAttribute.ID.section)
    clearDuplicationCheckState()
    goNextStep()
  }

  return { handleNextStep }
}
