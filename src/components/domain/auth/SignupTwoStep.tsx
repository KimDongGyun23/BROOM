import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { useValidateNickname } from '@/services/query/useAuthQuery'
import { useStepsActions } from '@/stores/steps'
import { FORM_ATTRIBUTE } from '@/utils/schema'

import { StyledButton, ValidateContainer } from './SignupStyle'

const useNicknameValidation = () => {
  const [isNicknameValid, setIsNicknameValid] = useState(false)
  const [nicknameValidationMessage, setNicknameValidationMessage] = useState('')
  const { mutate: validateNicknameMutation } = useValidateNickname()
  const { getValues } = useFormContext()

  const validateNickname = useCallback(() => {
    const nickname = getValues(FORM_ATTRIBUTE.NICKNAME.section)

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

  const handleNext = useCallback(async () => {
    const isValid = await trigger([
      FORM_ATTRIBUTE.NICKNAME.section,
      FORM_ATTRIBUTE.DISCHARGE_YEAR.section,
      FORM_ATTRIBUTE.SORT.section,
    ])

    if (isValid && isNicknameValid) goNextStep()
  }, [trigger, isNicknameValid, goNextStep])

  return (
    <>
      <InputGroup section={FORM_ATTRIBUTE.NICKNAME.section}>
        <InputGroup.Label
          label={FORM_ATTRIBUTE.NICKNAME.label}
          successMessage={isNicknameValid ? nicknameValidationMessage : null}
          errorMessage={!isNicknameValid ? nicknameValidationMessage : null}
        />
        <ValidateContainer>
          <InputGroup.Input {...FORM_ATTRIBUTE.NICKNAME.input} />
          <Button size="md" onClick={validateNickname}>
            중복 확인
          </Button>
        </ValidateContainer>
      </InputGroup>

      <InputGroup section={FORM_ATTRIBUTE.DISCHARGE_YEAR.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.DISCHARGE_YEAR.label} />
        <InputGroup.Input {...FORM_ATTRIBUTE.DISCHARGE_YEAR.input} />
      </InputGroup>

      <InputGroup section={FORM_ATTRIBUTE.SORT.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.SORT.label} />
        <InputGroup.SortOfArmy />
      </InputGroup>

      <StyledButton size="lg" onClick={handleNext} disabled={!isNicknameValid}>
        다음으로
      </StyledButton>
    </>
  )
}
