import styled from 'styled-components'

import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { ModalWithTwoButton } from '@/shared/ui/modal/ButtonModal'

import { useExitChatRoom } from '../hook/useExitChatRoom'

export const ChatRoomExitButton = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()
  const handleClickExitRoom = useExitChatRoom(closeModal)

  const handleClickOpenModal = () => openModal(MODAL_KEYS.confirm, '채팅방을 나가시겠습니까?')

  return (
    <>
      <ExitButton onClick={handleClickOpenModal}>채팅방 나가기</ExitButton>
      <ModalWithTwoButton
        label={modalLabel(MODAL_KEYS.confirm)}
        isModalOpen={isModalOpen(MODAL_KEYS.confirm)}
        closeModal={closeModal}
        primaryButton={{ onClickButton: handleClickExitRoom, buttonLabel: '확인' }}
      />
    </>
  )
}

const ExitButton = styled.button`
  ${({ theme }) => `
    ${theme.padding('md', 'lg')}
    ${theme.font(800, theme.colors.black[100])}
  `}
`
