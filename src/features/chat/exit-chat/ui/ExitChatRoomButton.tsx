import styled from 'styled-components'

import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { useModalActions } from '@/shared/model/modal.store'

export const ExitChatRoomButton = () => {
  const { openModal } = useModalActions()

  const handleClickButton = () => {
    openModal(MODAL_KEYS.EXIT_CHAT_CONFIRM, '채팅방을 나가시겠습니까?')
  }

  return <ExitButton onClick={handleClickButton}>채팅방 나가기</ExitButton>
}

const ExitButton = styled.button`
  ${({ theme }) => `
    ${theme.padding('md', 'lg')}
    ${theme.font(800, theme.colors.black[100])}
  `}
`
