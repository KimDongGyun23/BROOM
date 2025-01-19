import type { ElementType } from 'react'
import styled from 'styled-components'

import type { MilitaryBranchCode } from '@/utils/constants'

import { AirforceIcon, ArmyIcon, EtcIcon, MarineIcon, NavyIcon } from './icons/ProfileIcons'

const sizeMap = {
  lg: '64',
  md: '48',
  sm: '40',
} as const

const iconMap: Record<MilitaryBranchCode, ElementType> = {
  ARMY: ArmyIcon,
  MARINE: MarineIcon,
  NAVY: NavyIcon,
  AIRFORCE: AirforceIcon,
  ETC: EtcIcon,
}

type ProfileImageProps = {
  iconType: MilitaryBranchCode | null
  size: keyof typeof sizeMap
}

const IconContainer = styled.div`
  flex-shrink: 0;
`

export const ProfileImage = ({ iconType, size }: ProfileImageProps) => {
  if (!iconType || !iconMap[iconType]) return null
  const IconComponent = iconMap[iconType]

  return (
    <IconContainer>
      <IconComponent size={sizeMap[size]} />
    </IconContainer>
  )
}
