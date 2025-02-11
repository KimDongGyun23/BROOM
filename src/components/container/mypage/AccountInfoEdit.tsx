import { useEffect } from 'react'
import { FormProvider, useFormContext } from 'react-hook-form'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { Loading } from '@/components/view/Loading'
import { ModalWithOneButton } from '@/components/view/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { accountAttribute, useAccountForm } from '@/forms/useAccountForm'
import { useFieldValidation } from '@/hooks/useFieldValidation'
import { useValidateNickname } from '@/services/query/useAuthQuery'
import { useFetchAccountInfo, useUpdateUserAccount } from '@/services/query/useMypageQuery'
import { ModalStoreProvider, useModalActions, useModalState } from '@/stores/modal'
import { FormContainer, ValidateContainer } from '@/styles/commonStyles'
import type { ValidateNicknameRequest } from '@/types/auth'
import type { UserAccount } from '@/types/mypage'

import { ErrorPage } from '../home/ErrorPage'

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
          onSuccess: (res) => openModal(res),
          onError: (error) => openModal(error.message),
        },
      )
    } else {
      setError(nicknameSection, { type: 'manual', message: '닉네임 중복 확인을 해주세요.' })
    }
  }

  return { onSubmit: handleSubmit(handleSubmitForm) }
}

const AccountInfoEditForm = () => {
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
      <SubHeaderWithoutIcon type="edit" title="계정 정보" onClickComplete={onSubmit} />
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

const AccountInfoModal = () => {
  const { isModalOpen, label } = useModalState()
  const { closeModal } = useModalActions()

  useEffect(() => {
    closeModal()
  }, [closeModal])

  return (
    <ModalWithOneButton
      isOpen={isModalOpen}
      onClose={closeModal}
      content={label}
      button={{ onClick: closeModal, label: '확인' }}
    />
  )
}

export const AccountInfoEdit = () => {
  const { isPending, isError } = useFetchAccountInfo()
  const formMethod = useAccountForm()

  if (isPending) return <Loading />
  if (isError) return <ErrorPage />

  return (
    <ModalStoreProvider>
      <FormProvider {...formMethod}>
        <AccountInfoEditForm />
      </FormProvider>
      <AccountInfoModal />
    </ModalStoreProvider>
  )
}
