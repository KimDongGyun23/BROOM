import { useState } from 'react'

import { useValidateNickname } from '../query/useAuthQuery'

export const useNicknameValidation = () => {
  const [isNicknameValid, setIsNicknameValid] = useState(false)
  const [nicknameValidationMessage, setNicknameValidationMessage] = useState('')
  const { mutate: validateNicknameMutation } = useValidateNickname()

  const validateNickname = (nickname: string) => {
    validateNicknameMutation(
      { body: { nickname } },
      {
        onSuccess: () => {
          setNicknameValidationMessage('사용 가능한 닉네임입니다.')
          setIsNicknameValid(true)
        },
        onError: () => {
          setNicknameValidationMessage('이미 사용 중인 닉네임입니다.')
          setIsNicknameValid(false)
        },
      },
    )
  }

  return { validateNickname, isNicknameValid, nicknameValidationMessage }
}
