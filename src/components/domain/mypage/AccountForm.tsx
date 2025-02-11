import { useCallback, useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { accountAttribute } from '@/forms/useAccountForm'
import { useValidateNickname } from '@/services/query/useAuthQuery'
import { useAccountActions, useAccountModeState, useNicknameValidation } from '@/stores/account'
import { FormContainer, ValidateContainer } from '@/styles/commonStyles'

type AccountFormType = {
  initialNickname: string
}

const useValidation = ({ initialNickname }: AccountFormType) => {
  const [nicknameValidationMessage, setNicknameValidationMessage] = useState('')
  const { mutate: validateNicknameMutation } = useValidateNickname()
  const { getValues, clearErrors } = useFormContext()
  const { setNicknameValidated } = useAccountActions()

  const { NICKNAME } = accountAttribute
  const nicknameField = useWatch({ name: NICKNAME.section })

  const validateNickname = useCallback(() => {
    const nicknameSection = accountAttribute.NICKNAME.section
    const nickname = getValues(nicknameSection)

    validateNicknameMutation(
      { body: { nickname } },
      {
        onSuccess: () => {
          clearErrors(nicknameSection)
          setNicknameValidationMessage('사용 가능한 닉네임입니다.')
          setNicknameValidated(true)
        },
        onError: () => {
          clearErrors(nicknameSection)
          setNicknameValidationMessage('이미 사용 중인 닉네임입니다.')
          setNicknameValidated(false)
        },
      },
    )
  }, [clearErrors, getValues, setNicknameValidated, validateNicknameMutation])

  useEffect(() => {
    if (nicknameField === initialNickname) {
      setNicknameValidated(true)
    }
  }, [initialNickname, nicknameField, setNicknameValidated])

  return { validateNickname, nicknameValidationMessage }
}

export const AccountForm = ({ initialNickname }: AccountFormType) => {
  const isEditMode = useAccountModeState()
  const isNicknameValidated = useNicknameValidation()

  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = accountAttribute
  const { validateNickname, nicknameValidationMessage } = useValidation({ initialNickname })

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
