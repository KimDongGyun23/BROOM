import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import styled from 'styled-components'

import { InputGroup } from '@/components/view/inputGroup'
import { ModalWithOneButton } from '@/components/view/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useBoolean } from '@/hooks/useBoolean'
import { useNewPasswordForm } from '@/hooks/useForm'
import { usePasswordUpdate } from '@/services/service/usePasswordUpdate'
import { FORM_ATTRIBUTE } from '@/utils/schema'

const PasswordForm = () => (
  <StyledForm>
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
  </StyledForm>
)

export const NewPassword = () => {
  const formMethod = useNewPasswordForm()
  const { handleSubmit } = formMethod

  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [modalContent, setModalContent] = useState<string>('')

  const { handlePasswordUpdate } = usePasswordUpdate((message) => {
    setModalContent(message)
    openModal()
  })

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="비밀번호 재설정"
        onClickComplete={handleSubmit(handlePasswordUpdate)}
      />
      <FormProvider {...formMethod}>
        <PasswordForm />
      </FormProvider>

      <ModalWithOneButton
        isOpen={isModalOpen}
        onClose={closeModal}
        content={modalContent}
        button={{ onClick: closeModal, label: '완료' }}
      />
    </>
  )
}

const StyledForm = styled.form`
  flex-grow: 1;
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
  ${({ theme }) => theme.margin('container')};
  overflow-y: scroll;
`
