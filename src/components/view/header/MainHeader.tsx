import { Link } from 'react-router-dom'

import type { MilitaryBranchCode } from '@/utils/constants'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

import { ProfileImage } from '../ProfileImage'

export const MainHeader = () => {
  const iconType =
    (getSessionStorageItem(SESSION_KEYS.MILITARY_CHAPLAIN) as MilitaryBranchCode) || null
  const session = !!getSessionStorageItem(SESSION_KEYS.LOGIN)

  return (
    <header className="flex-between-align relative mx-4 h-20 py-4">
      <Link to={'/home'}>
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-jalnan text-[28px] leading-9 text-blue-600">
          BROOM
        </h1>
      </Link>

      {session && iconType && (
        <Link to={'/mypage'} className="cursor-pointer">
          <ProfileImage iconType={iconType} size="md" />
        </Link>
      )}
    </header>
  )
}
