import { useFormContext } from 'react-hook-form'

import { signupAttribute } from '@/entities/auth/config/auth.schema'
import {
  useIdDuplicationCheckActions,
  useIdUniqueState,
} from '@/features/check-duplication/model/duplication.store'
import { useStepsActions } from '@/features/signup/model/steps.store'

export const useSignupOneStepNext = () => {
  const { trigger, setError, clearErrors } = useFormContext()

  const { goNextStep } = useStepsActions()

  const isIdUnique = useIdUniqueState()

  const { ID, PASSWORD, CONFIRM } = signupAttribute

  const { clearDuplicationCheckState } = useIdDuplicationCheckActions()

  const handleNextStep = async () => {
    if (isIdUnique === null) {
      setError(ID.section, {
        type: 'manual',
        message: '아이디 중복 검사를 진행해주세요.',
      })
      return
    }

    const isValid = await trigger([ID.section, PASSWORD.section, CONFIRM.section])

    if (isValid && isIdUnique) {
      clearErrors(ID.section)
      clearDuplicationCheckState()
      goNextStep()
    }
  }

  return { handleNextStep }
}
