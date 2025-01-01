import { Link, useLocation } from 'react-router-dom'

import {
  BusReservationIcon,
  CarpoolIcon,
  ChattingIcon,
  HomeIcon,
  TeammateIcon,
} from './icons/NavIcons'

const NAV_ITEMS = [
  { icon: BusReservationIcon, url: '/bus-reserve' },
  { icon: CarpoolIcon, url: '/carpool' },
  { icon: HomeIcon, url: '/home' },
  { icon: ChattingIcon, url: '/chatting' },
  { icon: TeammateIcon, url: '/teammate' },
]

export const BottomNav = () => {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <nav>
      <ul className="flex-between px-4 pb-[19px] pt-[9px] shadow-md">
        {NAV_ITEMS.map(({ icon: Icon, url }) => (
          <li key={url} className="flex-center">
            <Link to={url}>
              <Icon active={currentPath.startsWith(url)} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
