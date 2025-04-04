import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { useNicknameDuplicationCheckMutation } from '../api/useNicknameDuplicationCheck.mutation'
import type { FieldType } from '../model/field.type'
import { useNicknameDuplicationCheckActions } from '../model/nicknameDuplicationCheck.store'

export const useNicknameDuplicationCheck = (section: FieldType['section']) => {
  const { mutate: checkNicknameDuplication } = useNicknameDuplicationCheckMutation()

  const { getValues, clearErrors } = useFormContext()

  const { setNicknameDuplicationCheckState } = useNicknameDuplicationCheckActions()

  const handleNicknameDuplicationCheck = useCallback(() => {
    const nickname = getValues(section)
    clearErrors(section)

    checkNicknameDuplication(
      { body: { nickname } },
      {
        onSuccess: (response) => setNicknameDuplicationCheckState(true, response),
        onError: (error) => {
          console.log(error)
          setNicknameDuplicationCheckState(false, error.message)
        },
      },
    )
  }, [getValues, section, clearErrors, checkNicknameDuplication, setNicknameDuplicationCheckState])

  return handleNicknameDuplicationCheck
}
