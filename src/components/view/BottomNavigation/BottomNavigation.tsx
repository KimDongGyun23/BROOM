import { Link, useLocation } from 'react-router-dom'

import {
  BusReservationIcon,
  CarpoolIcon,
  ChattingIcon,
  HomeIcon,
  TeamIcon,
} from '../icons/NavIcons'

import * as S from './BottomNavigation.style'

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
    <S.StyledNav>
      <S.NavigationList>
        {NAVIGATION_ITEMS.map(({ Icon, path }) => (
          <S.NavigationItem key={path}>
            <Link to={path}>
              <Icon active={pathname.startsWith(path)} />
            </Link>
          </S.NavigationItem>
        ))}
      </S.NavigationList>
    </S.StyledNav>
  )
}
