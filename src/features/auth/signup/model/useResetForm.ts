import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { useStepsActions } from './steps.store'

export const useResetForm = () => {
  const { resetSteps } = useStepsActions()
  const { reset } = useFormContext()

  useEffect(() => {
    return () => {
      resetSteps()
      reset()
    }
  }, [reset, resetSteps])
}
