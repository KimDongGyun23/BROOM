import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useStepsActions } from '@/shared/model/steps'
import { Button } from '@/shared/ui/Button'
import { InputGroup } from '@/shared/ui/inputGroup'

import { useValidateNickname } from '../api/useAuth.mutation'
import { signupAttribute } from '../config/auth.schema'

import { StyledButton, ValidateContainer } from './SignupStyle'

const useNicknameValidation = () => {
  const [isNicknameValid, setIsNicknameValid] = useState(false)
  const [nicknameValidationMessage, setNicknameValidationMessage] = useState('')
  const { mutate: validateNicknameMutation } = useValidateNickname()
  const { getValues } = useFormContext()

  const validateNickname = useCallback(() => {
    const nickname = getValues(signupAttribute.NICKNAME.section)

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
  }, [getValues, validateNicknameMutation])

  return { validateNickname, isNicknameValid, nicknameValidationMessage }
}

export const SignupTwoStep = () => {
  const { trigger } = useFormContext()
  const { goNextStep } = useStepsActions()
  const { validateNickname, isNicknameValid, nicknameValidationMessage } = useNicknameValidation()
  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = signupAttribute

  const handleNext = useCallback(async () => {
    const isValid = await trigger([
      NICKNAME.section,
      DISCHARGE_YEAR.section,
      MILITARY_BRANCH.section,
    ])

    if (isValid && isNicknameValid) goNextStep()
  }, [
    trigger,
    NICKNAME.section,
    DISCHARGE_YEAR.section,
    MILITARY_BRANCH.section,
    isNicknameValid,
    goNextStep,
  ])

  return (
    <>
      <InputGroup section={NICKNAME.section}>
        <InputGroup.Label
          label={NICKNAME.label}
          successMessage={isNicknameValid ? nicknameValidationMessage : null}
          errorMessage={!isNicknameValid ? nicknameValidationMessage : null}
        />
        <ValidateContainer>
          <InputGroup.Input {...NICKNAME.input} />
          <Button size="md" onClick={validateNickname}>
            중복 확인
          </Button>
        </ValidateContainer>
      </InputGroup>

      <InputGroup section={DISCHARGE_YEAR.section}>
        <InputGroup.Label label={DISCHARGE_YEAR.label} />
        <InputGroup.Input {...DISCHARGE_YEAR.input} />
      </InputGroup>

      <InputGroup section={MILITARY_BRANCH.section}>
        <InputGroup.Label label={MILITARY_BRANCH.label} />
        <InputGroup.SortOfArmy />
      </InputGroup>

      <StyledButton size="lg" onClick={handleNext} disabled={!isNicknameValid}>
        다음으로
      </StyledButton>
    </>
  )
}
