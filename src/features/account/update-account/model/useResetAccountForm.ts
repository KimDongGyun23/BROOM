import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { useNicknameDuplicationCheckActions } from '@/features/auth/check-duplication/model/duplication.store'

export const useResetAccountForm = () => {
  const { reset } = useFormContext()
  const { clearDuplicationCheckState: clearNicknameDuplicationCheckState } =
    useNicknameDuplicationCheckActions()

  useEffect(() => {
    return () => {
      reset()
      clearNicknameDuplicationCheckState()
    }
  }, [clearNicknameDuplicationCheckState, reset])
}
