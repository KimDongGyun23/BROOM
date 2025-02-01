import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { useValidateId } from '@/services/query/useAuthQuery'
import { useStepsActions } from '@/stores/steps'
import { FORM_ATTRIBUTE } from '@/utils/schema'

import { StyledButton, ValidateContainer } from './SignupStyle'

const useIdValidation = () => {
  const [isIdValid, setIsIdValid] = useState(false)
  const [idValidationMessage, setIdValidationMessage] = useState('')
  const { mutate: validateIdMutation } = useValidateId()
  const { getValues } = useFormContext()

  const validateId = useCallback(() => {
    const userId = getValues(FORM_ATTRIBUTE.SIGNUP_ID.section)
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
  }, [getValues, validateIdMutation])

  return { validateId, isIdValid, idValidationMessage }
}

export const SignupOneStep = () => {
  const { goNextStep } = useStepsActions()
  const { trigger } = useFormContext()
  const { validateId, isIdValid, idValidationMessage } = useIdValidation()

  const handleNext = useCallback(async () => {
    const isValid = await trigger([
      FORM_ATTRIBUTE.SIGNUP_ID.section,
      FORM_ATTRIBUTE.SIGNUP_PASSWORD.section,
      FORM_ATTRIBUTE.CONFIRM.section,
    ])

    if (isValid && isIdValid) goNextStep()
  }, [trigger, isIdValid, goNextStep])

  return (
    <>
      <InputGroup section={FORM_ATTRIBUTE.SIGNUP_ID.section}>
        <InputGroup.Label
          label={FORM_ATTRIBUTE.SIGNUP_ID.label}
          successMessage={isIdValid ? idValidationMessage : null}
          errorMessage={!isIdValid ? idValidationMessage : null}
        />
        <ValidateContainer>
          <InputGroup.Input {...FORM_ATTRIBUTE.SIGNUP_ID.input} />
          <Button size="md" onClick={validateId}>
            중복 확인
          </Button>
        </ValidateContainer>
      </InputGroup>

      <InputGroup section={FORM_ATTRIBUTE.SIGNUP_PASSWORD.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.SIGNUP_PASSWORD.label} />
        <InputGroup.PasswordInput {...FORM_ATTRIBUTE.SIGNUP_PASSWORD.input} />
      </InputGroup>

      <InputGroup section={FORM_ATTRIBUTE.CONFIRM.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.CONFIRM.label} />
        <InputGroup.PasswordInput {...FORM_ATTRIBUTE.CONFIRM.input} />
      </InputGroup>

      <StyledButton size="lg" onClick={handleNext} disabled={!isIdValid}>
        다음으로
      </StyledButton>
    </>
  )
}
