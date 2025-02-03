import { FormProvider } from 'react-hook-form'

import { InputGroup } from '@/components/view/inputGroup'
import { ModalWithOneButton } from '@/components/view/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { usePasswordUpdateForm } from '@/forms/usePasswordUpdateForm'
import { useBoolean } from '@/hooks/useBoolean'
import { FormContainer } from '@/styles/commonStyles'
import { FORM_ATTRIBUTE } from '@/utils/schema'

export const NewPassword = () => {
  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const { formMethod, onSubmit, message } = usePasswordUpdateForm(openModal)

  return (
    <>
      <SubHeaderWithoutIcon type="complete" title="비밀번호 재설정" onClickComplete={onSubmit} />

      <FormProvider {...formMethod}>
        <FormContainer>
          <InputGroup section={FORM_ATTRIBUTE.PREV_PASSWORD.section}>
            <InputGroup.Label label={FORM_ATTRIBUTE.PREV_PASSWORD.label} />
            <InputGroup.PasswordInput {...FORM_ATTRIBUTE.PREV_PASSWORD.input} />
          </InputGroup>

          <InputGroup section={FORM_ATTRIBUTE.NEW_PASSWORD.section}>
            <InputGroup.Label label={FORM_ATTRIBUTE.NEW_PASSWORD.label} />
            <InputGroup.PasswordInput {...FORM_ATTRIBUTE.NEW_PASSWORD.input} />
          </InputGroup>

          <InputGroup section={FORM_ATTRIBUTE.CONFIRM.section}>
            <InputGroup.Label label={FORM_ATTRIBUTE.CONFIRM.label} />
            <InputGroup.PasswordInput {...FORM_ATTRIBUTE.CONFIRM.input} />
          </InputGroup>
        </FormContainer>
      </FormProvider>

      <ModalWithOneButton
        isOpen={isModalOpen}
        onClose={closeModal}
        content={message}
        button={{ onClick: closeModal, label: '완료' }}
      />
    </>
  )
}
