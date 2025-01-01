import type { BUS_RESERVATION_STATES } from '@/utils'

export type IconType = 'ARMY' | 'MARINE' | 'NAVY' | 'AIRFORCE' | 'ETC'
export type FilterNameType = '제목' | '훈련 날짜' | '출발 장소'

export type SvgIconProps = {
  size?: string
  active?: boolean
}

export type KebabMapType = {
  label: FilterNameType
  type: string
  placeholder: string
}[]

export type StepProps = {
  label: string
}

export type BusReservationStateType =
  (typeof BUS_RESERVATION_STATES)[keyof typeof BUS_RESERVATION_STATES]
