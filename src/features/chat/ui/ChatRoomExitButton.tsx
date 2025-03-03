import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useSidebarActions } from '@/features/chat/model/sidebar.store'
import { useParamId } from '@/shared/hook/useParamId'
import { useModalActions } from '@/shared/model/modal.store'
import { ModalWithOneButton, ModalWithTwoButton } from '@/shared/ui/modal/ButtonModal'

import { useExitChatRoom } from '../api/useChat.mutation'

export const ChatRoomExitButton = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const { mutate: exitRoom } = useExitChatRoom()

  const { openOneButtonModal, openTwoButtonModal, closeModal } = useModalActions()
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
        onError: (error) => openOneButtonModal(error.message, false),
      },
    )
  }

  return (
    <>
      <ExitButton onClick={handleClickOpenModal}>채팅방 나가기</ExitButton>
      <ModalWithTwoButton
        primaryButton={{ onClickButton: handleClickExitRoom, buttonLabel: '확인' }}
      />
      <ModalWithOneButton />
    </>
  )
}

const ExitButton = styled.button`
  ${({ theme }) => theme.padding('md', 'lg')};
  ${({ theme }) => theme.font(800, theme.colors.black[100])};
`
