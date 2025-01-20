import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { useNicknameValidation } from '@/services/service/useNicknameValidation'
import { useStepsActions } from '@/stores/steps'
import { FORM_ATTRIBUTE } from '@/utils/constants'

import { FormContainer, StyledButton, ValidateContainer } from './SignupStyle'

export const SignupTwoStep = () => {
  const { trigger, watch } = useFormContext()
  const { goNextStep } = useStepsActions()
  const { validateNickname, isNicknameValid, nicknameValidationMessage } = useNicknameValidation()

  const watchNicknameField = watch(FORM_ATTRIBUTE.NICKNAME.section)

  const handleNext = async () => {
    const isValid = await trigger([
      FORM_ATTRIBUTE.NICKNAME.section,
      FORM_ATTRIBUTE.DISCHARGE_YEAR.section,
      FORM_ATTRIBUTE.SORT.section,
    ])
    if (isValid && isNicknameValid) {
      goNextStep()
    }
  }

  return (
    <>
      <FormContainer>
        <InputGroup section={FORM_ATTRIBUTE.NICKNAME.section}>
          <InputGroup.Label
            label={FORM_ATTRIBUTE.NICKNAME.label}
            successMessage={isNicknameValid ? nicknameValidationMessage : null}
            errorMessage={!isNicknameValid ? nicknameValidationMessage : null}
          />
          <ValidateContainer>
            <InputGroup.Input {...FORM_ATTRIBUTE.NICKNAME.input} />
            <Button size="md" onClick={() => validateNickname(watchNicknameField)}>
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
      </FormContainer>

      <StyledButton size="lg" onClick={handleNext} disabled={!isNicknameValid}>
        다음으로
      </StyledButton>
    </>
  )
}
