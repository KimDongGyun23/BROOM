import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import {
  BusReservationIcon,
  CarpoolIcon,
  ChattingIcon,
  HomeIcon,
  MypageIcon,
} from '@/shared/ui/icons/NavIcons'

const NAVIGATION_ITEMS = [
  { Icon: BusReservationIcon, path: '/bus-reserve' },
  { Icon: CarpoolIcon, path: '/carpool' },
  { Icon: HomeIcon, path: '/home' },
  { Icon: ChattingIcon, path: '/chat' },
  { Icon: MypageIcon, path: '/mypage' },
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
  ${({ theme }) => theme.boxShadow('md')};
`

export const NavigationList = styled.ul`
  ${({ theme }) => theme.flexBox('row', undefined, 'space-between')};
  ${({ theme }) => theme.boxShadow('md')};
  ${({ theme }) => theme.padding('sm', 'lg', 'xl')};
`

export const NavigationItem = styled.li`
  ${({ theme }) => theme.flexBox('row', 'center', 'center')};
`
