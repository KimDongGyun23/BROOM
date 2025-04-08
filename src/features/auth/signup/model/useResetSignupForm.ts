import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  useIdDuplicationCheckActions,
  useNicknameDuplicationCheckActions,
} from '../../check-duplication/model/duplication.store'

import { useStepsActions } from './steps.store'

export const useResetSignupForm = () => {
  const { reset } = useFormContext()
  const { resetSteps } = useStepsActions()
  const { clearDuplicationCheckState: clearIdDuplicationCheckState } =
    useIdDuplicationCheckActions()
  const { clearDuplicationCheckState: clearNicknameDuplicationCheckState } =
    useNicknameDuplicationCheckActions()

  useEffect(() => {
    return () => {
      reset()
      resetSteps()
      clearIdDuplicationCheckState()
      clearNicknameDuplicationCheckState()
    }
  }, [clearIdDuplicationCheckState, clearNicknameDuplicationCheckState, reset, resetSteps])
}
