import { useCallback, useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { accountAttribute } from '@/forms/useAccountForm'
import { useValidateNickname } from '@/services/query/useAuthQuery'
import { useAccountActions, useAccountModeState, useNicknameValidation } from '@/stores/account'
import { FormContainer, ValidateContainer } from '@/styles/commonStyles'
import { FORM_ATTRIBUTE } from '@/utils/schema'

const useValidation = () => {
  const [nicknameValidationMessage, setNicknameValidationMessage] = useState('')
  const { mutate: validateNicknameMutation } = useValidateNickname()
  const { getValues, clearErrors } = useFormContext()
  const { setNicknameValidated } = useAccountActions()

  const validateNickname = useCallback(() => {
    const nickname = getValues(FORM_ATTRIBUTE.NICKNAME.section)

    validateNicknameMutation(
      { body: { nickname } },
      {
        onSuccess: () => {
          clearErrors(accountAttribute.NICKNAME.section)
          setNicknameValidationMessage('사용 가능한 닉네임입니다.')
          setNicknameValidated(true)
        },
        onError: () => {
          clearErrors(accountAttribute.NICKNAME.section)
          setNicknameValidationMessage('이미 사용 중인 닉네임입니다.')
          setNicknameValidated(false)
        },
      },
    )
  }, [clearErrors, getValues, setNicknameValidated, validateNicknameMutation])

  return { validateNickname, nicknameValidationMessage }
}

export const AccountForm = () => {
  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = accountAttribute
  const nicknameField = useWatch({ name: NICKNAME.section })

  const isEditMode = useAccountModeState()
  const { setNicknameValidated } = useAccountActions()

  const isNicknameValidated = useNicknameValidation()
  const { validateNickname, nicknameValidationMessage } = useValidation()

  useEffect(() => {
    setNicknameValidated(false)
  }, [nicknameField, setNicknameValidated])

  return (
    <FormContainer $isFull>
      <InputGroup section={NICKNAME.section}>
        <InputGroup.Label
          label={NICKNAME.label}
          successMessage={isNicknameValidated ? nicknameValidationMessage : null}
          errorMessage={!isNicknameValidated ? nicknameValidationMessage : null}
        />
        <ValidateContainer>
          <InputGroup.Input readOnly={!isEditMode} {...NICKNAME.input} />
          {isEditMode && (
            <Button size="md" onClick={validateNickname}>
              중복 확인
            </Button>
          )}
        </ValidateContainer>
      </InputGroup>

      <InputGroup section={DISCHARGE_YEAR.section}>
        <InputGroup.Label label={DISCHARGE_YEAR.label} />
        <InputGroup.Input readOnly={!isEditMode} {...DISCHARGE_YEAR.input} />
      </InputGroup>

      <InputGroup section={MILITARY_BRANCH.section}>
        <InputGroup.Label label={MILITARY_BRANCH.label} />
        <InputGroup.SortOfArmy disabled={!isEditMode} />
      </InputGroup>
    </FormContainer>
  )
}
