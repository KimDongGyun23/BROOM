import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { ModalWithOneButton, ModalWithTwoButton } from '@/components/view/modal/ButtonModal'
import { useParamId } from '@/hooks/useParamId'
import { useExitChatRoom } from '@/query/useChattingQuery'
import { useModalActions, useModalState, useTwoButtonModalState } from '@/stores/modal'

export const ChatRoomExitButton = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const { mutate: exitRoom } = useExitChatRoom()

  const { isModalOpen, label } = useModalState()
  const { isTwoButtonModalOpen, twoButtonLabel } = useTwoButtonModalState()
  const { openModal, openTwoButtonModal, closeModal, closeSidebar } = useModalActions()

  const handleClickOpenModal = () => openTwoButtonModal('채팅방을 나가시겠습니까?')

  const handleClickExitRoom = () => {
    exitRoom(
      { urls: { boardId } },
      {
        onSuccess: (response) => openModal(response, true),
        onError: (error) => openModal(error.message, false),
      },
    )
  }

  const handleCloseModal = () => {
    closeModal()
    closeSidebar()
    navigate('/chat')
  }

  return (
    <>
      <ExitButton onClick={handleClickOpenModal}>채팅방 나가기</ExitButton>
      <ModalWithTwoButton
        isOpen={isTwoButtonModalOpen}
        onClose={closeModal}
        content={twoButtonLabel}
        primaryButton={{ onClick: handleClickExitRoom, label: '확인' }}
        secondaryButton={{ onClick: closeModal, label: '취소', secondary: true }}
      />
      <ModalWithOneButton
        isOpen={isModalOpen}
        onClose={closeModal}
        content={label}
        button={{ onClick: handleCloseModal, label: '확인' }}
      />
    </>
  )
}

const ExitButton = styled.button`
  ${({ theme }) => theme.padding('md', 'lg')};
  ${({ theme }) => theme.font(800, theme.colors.black[100])};
`
