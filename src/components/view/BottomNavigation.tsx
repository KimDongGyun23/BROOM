import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { BusReservationIcon, CarpoolIcon, ChattingIcon, HomeIcon, TeamIcon } from './icons/NavIcons'

const NAVIGATION_ITEMS = [
  { Icon: BusReservationIcon, path: '/bus-reserve' },
  { Icon: CarpoolIcon, path: '/carpool' },
  { Icon: HomeIcon, path: '/home' },
  { Icon: ChattingIcon, path: '/chatting' },
  { Icon: TeamIcon, path: '/team' },
]

export const BottomNavigation = () => {
  const { pathname } = useLocation()

  return (
    <StyledNav>
      <NavigationList>
        {NAVIGATION_ITEMS.map(({ Icon, path }) => (
          <NavigationItem key={path}>
            <Link to={path}>
              <Icon active={pathname.startsWith(path)} />
            </Link>
          </NavigationItem>
        ))}
      </NavigationList>
    </StyledNav>
  )
}

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
