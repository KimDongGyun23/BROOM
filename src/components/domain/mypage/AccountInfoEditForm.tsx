import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { accountAttribute } from '@/forms/useAccountForm'
import { useFieldValidation } from '@/hooks/useFieldValidation'
import { useValidateNickname } from '@/query/useAuthQuery'
import { useFetchAccountInfo, useUpdateUserAccount } from '@/query/useMypageQuery'
import { useModalActions } from '@/stores/modal'
import { FormContainer, ValidateContainer } from '@/styles/commonStyles'
import type { ValidateNicknameRequest } from '@/types/auth'
import type { UserAccount } from '@/types/mypage'

const useSubmitForm = (isValidated: boolean) => {
  const nicknameSection = accountAttribute.NICKNAME.section
  const { handleSubmit, setError, clearErrors } = useFormContext<UserAccount>()

  const { openModal } = useModalActions()
  const { mutate: updateAccount } = useUpdateUserAccount()

  const handleSubmitForm = (formData: UserAccount) => {
    if (isValidated) {
      clearErrors(nicknameSection)
      updateAccount(
        { body: formData },
        {
          onSuccess: (response) => openModal(response.data, true),
          onError: (error) => openModal(error.response?.data as string, false),
        },
      )
    } else {
      setError(nicknameSection, { type: 'manual', message: '닉네임 중복 확인을 해주세요.' })
    }
  }

  return { onSubmit: handleSubmit(handleSubmitForm) }
}

export const AccountInfoEditForm = () => {
  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = accountAttribute

  const { data: defaultValues } = useFetchAccountInfo()
  const { mutate: validateNickname } = useValidateNickname()

  const {
    validationState: { isValidated, message },
    validateField,
  } = useFieldValidation<ValidateNicknameRequest>({
    fieldName: NICKNAME.section,
    initialValue: defaultValues?.nickname || '',
    mutate: validateNickname,
  })

  const { onSubmit } = useSubmitForm(isValidated)

  return (
    <>
      <SubHeaderWithoutIcon type="complete" title="계정 정보 수정" onClickComplete={onSubmit} />
      <FormContainer $isFull>
        <InputGroup section={NICKNAME.section}>
          <InputGroup.Label
            label={NICKNAME.label}
            successMessage={isValidated ? message : null}
            errorMessage={!isValidated ? message : null}
          />
          <ValidateContainer>
            <InputGroup.Input {...NICKNAME.input} />
            <Button size="md" onClick={validateField}>
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
      </FormContainer>
    </>
  )
}
