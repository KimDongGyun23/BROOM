import { styled } from 'styled-components'

import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

import { useLogout } from '../hook/useLogout'

export const LogoutButton = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()
  const { handleLogout } = useLogout(openModal)

  return (
    <>
      <ActionButton onClick={handleLogout}>로그아웃</ActionButton>

      <ModalWithOneButton
        label={modalLabel(MODAL_KEYS.error)}
        isModalOpen={isModalOpen(MODAL_KEYS.error)}
        closeModal={closeModal}
        button={{ onClickButton: closeModal }}
      />
    </>
  )
}

const ActionButton = styled.button`
  ${({ theme }) => theme.padding(0, 'lg')};
  ${({ theme }) => theme.font(800, theme.colors.black[500])};
`
