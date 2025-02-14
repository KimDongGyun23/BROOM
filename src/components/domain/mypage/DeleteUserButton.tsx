import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

import { ModalWithOneButton } from '@/components/view/Modal'
import { useUserDeletion } from '@/query/useMypageQuery'
import { useModalActions, useModalState } from '@/stores/modal'
import { clearSessionStorage } from '@/utils/storage'

export const DeleteUserButton = () => {
  const navigate = useNavigate()
  const { mutate: deleteUser } = useUserDeletion()

  const { isModalOpen, label } = useModalState()
  const { openModal, closeModal } = useModalActions()

  const handleDeleteUser = () => {
    deleteUser(undefined, {
      onSuccess: (response) => openModal(response as unknown as string, true),
      onError: (error) => openModal(error.response?.data as string, false),
    })
  }

  const handleModalClose = () => {
    closeModal()
    clearSessionStorage()
    navigate('/home')
  }

  return (
    <>
      <ActionButton onClick={handleDeleteUser}>회원탈퇴</ActionButton>
      <ModalWithOneButton
        isOpen={isModalOpen}
        onClose={closeModal}
        content={label}
        button={{ onClick: handleModalClose, label: '확인' }}
      />
    </>
  )
}

const ActionButton = styled.button`
  ${({ theme }) => theme.padding(0, 'lg')};
  ${({ theme }) => theme.font(800, theme.colors.error)};
`
