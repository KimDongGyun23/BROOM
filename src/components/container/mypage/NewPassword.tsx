import { useState } from 'react'
import { FormProvider } from 'react-hook-form'

import { InputGroup, SubHeaderWithoutIcon } from '@/components/view'
import { ModalWithOneButton } from '@/components/view/Modal'
import { useBoolean, useNewPasswordForm } from '@/hooks'
import { usePasswordUpdate } from '@/services/service'

const PasswordForm = () => (
  <form className="flex-column scroll mx-4 mb-2 mt-7 grow gap-7">
    <InputGroup>
      <InputGroup.Label section="password">기존 비밀번호</InputGroup.Label>
      <InputGroup.Input
        section="password"
        type="password"
        placeholder="기존 비밀번호를 입력해주세요."
      />
    </InputGroup>

    <InputGroup>
      <InputGroup.Label section="newPassword">새로운 비밀번호</InputGroup.Label>
      <InputGroup.Input
        section="newPassword"
        type="password"
        placeholder="최소 8글자, 최대 16글자"
      />
    </InputGroup>

    <InputGroup>
      <InputGroup.Label section="confirm">새로운 비밀번호 확인</InputGroup.Label>
      <InputGroup.Input section="confirm" type="password" placeholder="최소 8글자, 최대 16글자" />
    </InputGroup>
  </form>
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
