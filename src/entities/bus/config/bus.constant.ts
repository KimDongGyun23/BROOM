export const BUS_APPLICATION_STATUS = {
  COMPLETED: '신청 완료',
  NOT_FOUND: '정보 없음',
  PENDING: '조회 전',
} as const

export type BusApplicationStatus =
  (typeof BUS_APPLICATION_STATUS)[keyof typeof BUS_APPLICATION_STATUS]
