import { useState } from 'react'

import { useValidateId } from '../query'

export const useIdValidation = () => {
  const [isIdValid, setIsIdValid] = useState(false)
  const [idValidationMessage, setIdValidationMessage] = useState('')
  const { mutate: validateIdMutation } = useValidateId()

  const validateId = (userId: string) => {
    validateIdMutation(
      { body: { userId } },
      {
        onSuccess: () => {
          setIdValidationMessage('사용 가능한 아이디입니다.')
          setIsIdValid(true)
        },
        onError: () => {
          setIdValidationMessage('이미 사용 중인 아이디입니다.')
          setIsIdValid(false)
        },
      },
    )
  }

  return { validateId, isIdValid, idValidationMessage }
}
