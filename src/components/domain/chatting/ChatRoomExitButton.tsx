import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useExitChatRoom } from '@/query/useChattingQuery'
import { useParamId } from '@/shared/hook/useParamId'
import { useModalActions, useModalState, useTwoButtonModalState } from '@/shared/model/modal'
import { useSidebarActions } from '@/shared/model/sidebar'
import { ModalWithOneButton, ModalWithTwoButton } from '@/shared/ui/modal/ButtonModal'

export const ChatRoomExitButton = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const { mutate: exitRoom } = useExitChatRoom()

  const { isModalOpen, label } = useModalState()
  const { isTwoButtonModalOpen, twoButtonLabel } = useTwoButtonModalState()
  const { openModal, openTwoButtonModal, closeModal } = useModalActions()
  const { closeSidebar } = useSidebarActions()

  const handleClickOpenModal = () => openTwoButtonModal('채팅방을 나가시겠습니까?')

  const handleClickExitRoom = () => {
    exitRoom(
      { urls: { boardId } },
      {
        onSuccess: () => {
          closeModal()
          closeSidebar()
          navigate('/chat')
        },
        onError: (error) => openModal(error.message, false),
      },
    )
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
        button={{ onClick: closeModal, label: '확인' }}
      />
    </>
  )
}

const ExitButton = styled.button`
  ${({ theme }) => theme.padding('md', 'lg')};
  ${({ theme }) => theme.font(800, theme.colors.black[100])};
`
