import { useFormContext } from 'react-hook-form'

import { FormContainer, ValidateContainer } from '@/app/style/commonStyles'
import { useValidateNickname } from '@/features/auth/api/useAuth.mutation'
import type { ValidateNicknameRequest } from '@/features/auth/model/auth.type'
import type { AccountInformation } from '@/features/mypage/model/mypage.type'
import { useFieldValidation } from '@/shared/hook/useFieldValidation'
import { useModalActions } from '@/shared/model/modal'
import { Button } from '@/shared/ui/Button'
import { InputGroup } from '@/shared/ui/inputGroup'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { useUpdateAccountInformation } from '../api/useMypage.mutation'
import { useFetchAccountInformation } from '../api/useMypage.query'
import { accountInformationAttribute } from '../model/mypage.schema'

const useAccountInformationSubmit = (isNicknameValidated: boolean) => {
  const nicknameField = accountInformationAttribute.NICKNAME.section
  const { handleSubmit, setError, clearErrors } = useFormContext<AccountInformation>()

  const { openModal } = useModalActions()
  const { mutate: updateAccountInformation } = useUpdateAccountInformation()

  const handleSubmitForm = (formData: AccountInformation) => {
    if (isNicknameValidated) {
      clearErrors(nicknameField)
      updateAccountInformation(
        { body: formData },
        {
          onSuccess: (response) => openModal(response, true),
          onError: (error) => openModal(error.message, false),
        },
      )
    } else {
      setError(nicknameField, { type: 'manual', message: '닉네임 중복 확인을 해주세요.' })
    }
  }

  return { onSubmit: handleSubmit(handleSubmitForm) }
}

export const AccountInformationEditForm = () => {
  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = accountInformationAttribute

  const { data: defaultValues } = useFetchAccountInformation()
  const { mutate: validateNickname } = useValidateNickname()

  const {
    validationState: { isValidated: isNicknameValidated, message },
    validateField: handleNicknameValidation,
  } = useFieldValidation<ValidateNicknameRequest>({
    fieldName: NICKNAME.section,
    initialValue: defaultValues?.nickname || '',
    mutate: validateNickname,
  })

  const { onSubmit } = useAccountInformationSubmit(isNicknameValidated)

  return (
    <>
      <SubHeaderWithoutIcon type="complete" title="계정 정보 수정" onClickComplete={onSubmit} />
      <FormContainer $isFull>
        <InputGroup section={NICKNAME.section}>
          <InputGroup.Label
            label={NICKNAME.label}
            successMessage={isNicknameValidated ? message : null}
            errorMessage={!isNicknameValidated ? message : null}
          />
          <ValidateContainer>
            <InputGroup.Input {...NICKNAME.input} />
            <Button size="md" onClick={handleNicknameValidation}>
              중복 확인
            </Button>
          </ValidateContainer>
        </InputGroup>

        <InputGroup section={DISCHARGE_YEAR.section}>
          <InputGroup.Label label={DISCHARGE_YEAR.label} />
          <InputGroup.NumberInput {...DISCHARGE_YEAR.input} />
        </InputGroup>

        <InputGroup section={MILITARY_BRANCH.section}>
          <InputGroup.Label label={MILITARY_BRANCH.label} />
          <InputGroup.SortOfArmy />
        </InputGroup>
      </FormContainer>
    </>
  )
}
