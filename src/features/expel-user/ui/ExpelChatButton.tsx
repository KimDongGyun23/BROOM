import { styled } from 'styled-components'

import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useExpelUser } from '../hook/useExpelUser'

import { ExpelChatErrorModal } from './ExpelChatErrorModal'
import { ExpelChatSuccessModal } from './ExpelChatSuccessModal'

type ExpelChatButtonProps = {
  userId: string
}

export const ExpelChatButton = ({ userId }: ExpelChatButtonProps) => {
  const { isModalOpen, modalLabel, openModal, closeModal } = useModal()

  const handleExpelUser = useExpelUser(userId, openModal)

  return (
    <>
      <StyledButton onClick={handleExpelUser}>내보내기</StyledButton>

      <ExpelChatSuccessModal
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
      />

      <ExpelChatErrorModal
        label={modalLabel(MODAL_KEYS.error)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
      />
    </>
  )
}

const StyledButton = styled.button`
  ${({ theme }) => `
    ${theme.padding('xs', 'sm')};
    ${theme.font(900, theme.colors.orange)}
    ${theme.borderRadius('md')}
  `}
  background-color: ${({ theme }) => theme.colors.black[100]};
`
