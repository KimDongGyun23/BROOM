import { styled } from 'styled-components'

import { ModalStoreProvider } from '@/shared/model/modal.store'

import { useLogout } from '../hook/useLogout'

import { LogoutModal } from './LogoutModal'

const ButtonWithModal = () => {
  const { handleLogout } = useLogout()

  return <ActionButton onClick={handleLogout}>로그아웃</ActionButton>
}

export const LogoutButton = () => (
  <ModalStoreProvider>
    <ButtonWithModal />
    <LogoutModal />
  </ModalStoreProvider>
)

const ActionButton = styled.button`
  ${({ theme }) => theme.padding(0, 'lg')};
  ${({ theme }) => theme.font(800, theme.colors.black[500])};
`
