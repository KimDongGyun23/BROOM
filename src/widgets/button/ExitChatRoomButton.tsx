import styled from 'styled-components'

import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { ExitChatRoomConfirmModal } from './ExitChatRoomConfirmModal'

export const ExitChatRoomButton = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  const handleClickButton = () => openModal(MODAL_KEYS.confirm, '채팅방을 나가시겠습니까?')

  return (
    <>
      <ExitButton onClick={handleClickButton}>채팅방 나가기</ExitButton>

      <ExitChatRoomConfirmModal
        label={modalLabel(MODAL_KEYS.confirm)}
        isModalOpen={isModalOpen(MODAL_KEYS.confirm)}
        closeModal={closeModal}
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
