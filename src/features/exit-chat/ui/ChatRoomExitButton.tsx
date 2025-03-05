import styled from 'styled-components'

import { ModalStoreProvider, useModalActions } from '@/shared/model/modal.store'
import { ModalWithOneButton, ModalWithTwoButton } from '@/shared/ui/modal/ButtonModal'

import { useExitChatRoom } from '../hook/useExitChatRoom'

const ChatRoomExitButtonWithModal = () => {
  const handleClickExitRoom = useExitChatRoom()

  const { openTwoButtonModal } = useModalActions()

  const handleClickOpenModal = () => openTwoButtonModal('채팅방을 나가시겠습니까?')

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

export const ChatRoomExitButton = () => {
  return (
    <ModalStoreProvider>
      <ChatRoomExitButtonWithModal />
    </ModalStoreProvider>
  )
}

const ExitButton = styled.button`
  ${({ theme }) => `
    ${theme.padding('md', 'lg')}
    ${theme.font(800, theme.colors.black[100])}
  `}
`
