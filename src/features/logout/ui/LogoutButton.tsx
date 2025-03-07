import { styled } from 'styled-components'

import { ModalStoreProvider } from '@/shared/model/modal.store'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

import { useLogout } from '../hook/useLogout'

const ButtonWithModal = () => {
  const { handleLogout } = useLogout()

  return (
    <>
      <ActionButton onClick={handleLogout}>로그아웃</ActionButton>
      <ModalWithOneButton />
    </>
  )
}

export const LogoutButton = () => (
  <ModalStoreProvider>
    <ButtonWithModal />
  </ModalStoreProvider>
)

const ActionButton = styled.button`
  ${({ theme }) => theme.padding(0, 'lg')};
  ${({ theme }) => theme.font(800, theme.colors.black[500])};
`
