import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { Loading } from '@/components/view/Loading'
import { ModalWithOneButton } from '@/components/view/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { accountAttribute, useAccountForm } from '@/forms/useAccountForm'
import { useFieldValidation } from '@/hooks/useFieldValidation'
import { useValidateNickname } from '@/services/query/useAuthQuery'
import { useFetchAccountInfo } from '@/services/query/useMypageQuery'
import { ModalStoreProvider, useModalActions, useModalState } from '@/stores/modal'
import { FormContainer, ValidateContainer } from '@/styles/commonStyles'
import type { ValidateNicknameRequest } from '@/types/auth'

import { ErrorPage } from '../home/ErrorPage'

const AccountInfoEditContent = () => {
  const { closeModal } = useModalActions()
  const { isModalOpen, label } = useModalState()
  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = accountAttribute

  const { data: defaultValues, isPending, isError } = useFetchAccountInfo()
  const { mutate: validateNickname } = useValidateNickname()

  const {
    validationState: { isValidated, message },
    validateField,
  } = useFieldValidation<ValidateNicknameRequest>({
    fieldName: accountAttribute.NICKNAME.section,
    initialValue: defaultValues?.nickname || '',
    mutate: validateNickname,
    successMessage: '사용 가능한 닉네임입니다.',
    errorMessage: '이미 사용 중인 닉네임입니다.',
  })

  const { formMethod, onSubmit } = useAccountForm({ defaultValues, isValidated })

  useEffect(() => {
    closeModal()
  }, [closeModal])

  if (isPending) return <Loading />
  if (isError) return <ErrorPage />

  return (
    <>
      <FormProvider {...formMethod}>
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
      </FormProvider>

      <ModalWithOneButton
        isOpen={isModalOpen}
        onClose={closeModal}
        content={label}
        button={{ onClick: closeModal, label: '확인' }}
      />
    </>
  )
}

export const AccountInfoEdit = () => {
  return (
    <ModalStoreProvider>
      <AccountInfoEditContent />
    </ModalStoreProvider>
  )
}
