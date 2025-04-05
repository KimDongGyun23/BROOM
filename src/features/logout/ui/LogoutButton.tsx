import { styled } from 'styled-components'

import { useLogout } from '@/features/logout/hook/useLogout'
import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { ModalWithTwoButton } from '@/shared/ui/modal/ButtonModal'

export const LogoutButton = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  const { handleOpenModal, handleClickModal } = useLogout(openModal, closeModal)

  return (
    <>
      <StyledButton onClick={handleOpenModal}>로그아웃</StyledButton>

      <ModalWithTwoButton
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
        primaryButton={{ buttonLabel: '확인', onClickButton: handleClickModal }}
        secondaryButton={{ buttonLabel: '취소', onClickButton: closeModal }}
      />
    </>
  )
}

const StyledButton = styled.button`
  ${({ theme }) => `
    ${theme.padding(0, 'lg')}
    ${theme.font(800, theme.colors.black[500])}
  `}
`
