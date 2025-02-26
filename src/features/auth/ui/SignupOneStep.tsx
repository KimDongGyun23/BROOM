import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useStepsActions } from '@/shared/model/steps.store'
import { Button } from '@/shared/ui/Button'
import { InputGroup } from '@/shared/ui/inputGroup'

import { useValidateId } from '../api/useAuth.mutation'
import { signupAttribute } from '../config/auth.schema'

import { StyledButton, ValidateContainer } from './SignupStyle'

const useIdValidation = () => {
  const [isIdValid, setIsIdValid] = useState(false)
  const [idValidationMessage, setIdValidationMessage] = useState('')
  const { mutate: validateIdMutation } = useValidateId()
  const { getValues } = useFormContext()

  const validateId = useCallback(() => {
    const userId = getValues(signupAttribute.ID.section)
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
  const { ID, PASSWORD, CONFIRM } = signupAttribute

  const handleNext = useCallback(async () => {
    const isValid = await trigger([ID.section, PASSWORD.section, CONFIRM.section])
    if (isValid && isIdValid) goNextStep()
  }, [trigger, ID.section, PASSWORD.section, CONFIRM.section, isIdValid, goNextStep])

  return (
    <>
      <InputGroup section={ID.section}>
        <InputGroup.Label
          label={ID.label}
          successMessage={isIdValid ? idValidationMessage : null}
          errorMessage={!isIdValid ? idValidationMessage : null}
        />
        <ValidateContainer>
          <InputGroup.Input {...ID.input} />
          <Button size="md" onClick={validateId}>
            중복 확인
          </Button>
        </ValidateContainer>
      </InputGroup>

      <InputGroup section={PASSWORD.section}>
        <InputGroup.Label label={PASSWORD.label} />
        <InputGroup.PasswordInput {...PASSWORD.input} />
      </InputGroup>

      <InputGroup section={CONFIRM.section}>
        <InputGroup.Label label={CONFIRM.label} />
        <InputGroup.PasswordInput {...CONFIRM.input} />
      </InputGroup>

      <StyledButton size="lg" onClick={handleNext} disabled={!isIdValid}>
        다음으로
      </StyledButton>
    </>
  )
}
