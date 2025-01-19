import styled from 'styled-components'

export const StyledNav = styled.nav`
  box-shadow: ${({ theme }) => theme.boxShadow.md};
`

export const NavigationList = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 9px 16px 19px;
  box-shadow: ${({ theme }) => theme.boxShadow.md};
`

export const NavigationItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`
