import { useEffect } from 'react'
import { styled } from 'styled-components'

import { useLogout } from '@/features/logout/model/useLogout'
import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const LogoutButton = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  const { handleOpenModal, handleClickModal } = useLogout(openModal, closeModal)

  useEffect(() => {
    if (isModalOpen(MODAL_KEYS.success)) {
      const handlePopState = (event: PopStateEvent) => {
        if (event.state?.isLogoutModalOpen) {
          handleClickModal()
        }
      }

      window.addEventListener('popstate', handlePopState)
      return () => window.removeEventListener('popstate', handlePopState)
    }
  }, [handleClickModal, isModalOpen])

  return (
    <>
      <StyledButton onClick={handleOpenModal}>로그아웃</StyledButton>

      <ModalWithOneButton
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={handleClickModal}
        button={{ onClickButton: handleClickModal }}
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
