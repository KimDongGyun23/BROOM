import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

import { ModalWithOneButton } from '@/components/view/Modal'
import { useLogout } from '@/query/useMypageQuery'
import { useModalActions, useModalState } from '@/stores/modal'
import { clearSessionStorage } from '@/utils/storage'

export const LogoutButton = () => {
  const navigate = useNavigate()
  const { mutate: logout } = useLogout()

  const { isModalOpen, label } = useModalState()
  const { openModal, closeModal } = useModalActions()

  const handleLogout = () => {
    logout(undefined, {
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
      <ActionButton onClick={handleLogout}>로그아웃</ActionButton>
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
  ${({ theme }) => theme.border('underline', 'right')};
  ${({ theme }) => theme.font(800, theme.colors.black[500])};
`
