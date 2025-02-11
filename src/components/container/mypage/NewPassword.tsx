import { FormProvider } from 'react-hook-form'

import { InputGroup } from '@/components/view/inputGroup'
import { ModalWithOneButton } from '@/components/view/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { newPasswordAttribute, usePasswordUpdateForm } from '@/forms/usePasswordUpdateForm'
import { ModalStoreProvider, useModalActions, useModalState } from '@/stores/modal'
import { FormContainer } from '@/styles/commonStyles'

const NewPasswordContent = () => {
  const { isModalOpen, label } = useModalState()
  const { closeModal } = useModalActions()

  const { formMethod, onSubmit } = usePasswordUpdateForm()

  const { PREV_PASSWORD, NEW_PASSWORD, CONFIRM } = newPasswordAttribute

  return (
    <>
      <SubHeaderWithoutIcon type="complete" title="비밀번호 재설정" onClickComplete={onSubmit} />

      <FormProvider {...formMethod}>
        <FormContainer>
          <InputGroup section={PREV_PASSWORD.section}>
            <InputGroup.Label label={PREV_PASSWORD.label} />
            <InputGroup.PasswordInput {...PREV_PASSWORD.input} />
          </InputGroup>

          <InputGroup section={NEW_PASSWORD.section}>
            <InputGroup.Label label={NEW_PASSWORD.label} />
            <InputGroup.PasswordInput {...NEW_PASSWORD.input} />
          </InputGroup>

          <InputGroup section={CONFIRM.section}>
            <InputGroup.Label label={CONFIRM.label} />
            <InputGroup.PasswordInput {...CONFIRM.input} />
          </InputGroup>
        </FormContainer>
      </FormProvider>

      <ModalWithOneButton
        isOpen={isModalOpen}
        onClose={closeModal}
        content={label}
        button={{ onClick: closeModal, label: '완료' }}
      />
    </>
  )
}

export const NewPassword = () => {
  return (
    <ModalStoreProvider>
      <NewPasswordContent />
    </ModalStoreProvider>
  )
}
