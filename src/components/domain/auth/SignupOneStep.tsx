import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { useIdValidation } from '@/services/service/useIdValidation'
import { useStepsActions } from '@/stores/steps'
import { FORM_ATTRIBUTE } from '@/utils/schema'

import { FormContainer, StyledButton, ValidateContainer } from './SignupStyle'

export const SignupOneStep = () => {
  const { goNextStep } = useStepsActions()
  const { trigger, watch } = useFormContext()
  const { validateId, isIdValid, idValidationMessage } = useIdValidation()

  const watchUserIdField = watch(FORM_ATTRIBUTE.SIGNUP_ID.section)

  const handleNext = async () => {
    const isValid = await trigger([
      FORM_ATTRIBUTE.SIGNUP_ID.section,
      FORM_ATTRIBUTE.SIGNUP_PASSWORD.section,
      FORM_ATTRIBUTE.CONFIRM.section,
    ])
    if (isValid && isIdValid) {
      goNextStep()
    }
  }

  return (
    <>
      <FormContainer>
        <InputGroup section={FORM_ATTRIBUTE.SIGNUP_ID.section}>
          <InputGroup.Label
            label={FORM_ATTRIBUTE.SIGNUP_ID.label}
            successMessage={isIdValid ? idValidationMessage : null}
            errorMessage={!isIdValid ? idValidationMessage : null}
          />
          <ValidateContainer>
            <InputGroup.Input {...FORM_ATTRIBUTE.SIGNUP_ID.input} />
            <Button size="md" onClick={() => validateId(watchUserIdField)}>
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
      </FormContainer>

      <StyledButton size="lg" onClick={handleNext} disabled={!isIdValid}>
        다음으로
      </StyledButton>
    </>
  )
}
