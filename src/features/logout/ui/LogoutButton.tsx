import { styled } from 'styled-components'

import { useLogout } from '../hook/useLogout'

export const LogoutButton = () => {
  const { handleLogout } = useLogout()

  return <ActionButton onClick={handleLogout}>로그아웃</ActionButton>
}

const ActionButton = styled.button`
  ${({ theme }) => theme.padding(0, 'lg')};
  ${({ theme }) => theme.font(800, theme.colors.black[500])};
`
