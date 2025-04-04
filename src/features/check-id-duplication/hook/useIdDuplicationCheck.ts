import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { useIdDuplicationCheckMutation } from '../api/useIdDuplicationCheck.mutation'
import type { FieldType } from '../model/field.type'
import { useIdDuplicationCheckActions } from '../model/idDuplicationCheck.store'

export const useIdDuplicationCheck = (section: FieldType['section']) => {
  const { mutate: checkIdDuplication } = useIdDuplicationCheckMutation()

  const { getValues, clearErrors } = useFormContext()

  const { setIdDuplicationCheckState } = useIdDuplicationCheckActions()

  const handleIdDuplicationCheck = useCallback(() => {
    const userId = getValues(section)
    clearErrors(section)

    checkIdDuplication(
      { body: { userId } },
      {
        onSuccess: (response) => setIdDuplicationCheckState(true, response),
        onError: (error) => {
          const errorMessage = error.response?.data || '아이디 중복 검사에 실패했습니다.'
          setIdDuplicationCheckState(false, errorMessage)
        },
      },
    )
  }, [getValues, section, clearErrors, checkIdDuplication, setIdDuplicationCheckState])

  return handleIdDuplicationCheck
}
