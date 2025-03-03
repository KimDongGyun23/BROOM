export const BUS_RESERVATION_STATES = {
  COMPLETED: '신청 완료',
  NOT_FOUND: '정보 없음',
  PENDING: '조회 전',
} as const

export type BusApplicationState =
  (typeof BUS_RESERVATION_STATES)[keyof typeof BUS_RESERVATION_STATES]
