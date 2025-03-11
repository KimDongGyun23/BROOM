import { styled } from 'styled-components'

import { useLogout } from '@/features/logout/hook/useLogout'

export const LogoutButton = () => {
  const { handleLogout } = useLogout()

  return <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
}

const StyledButton = styled.button`
  ${({ theme }) => `
    ${theme.padding(0, 'lg')}
    ${theme.font(800, theme.colors.black[500])}
  `}
`
