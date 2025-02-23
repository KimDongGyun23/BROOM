export const POST_INFO = { label: '승차 공유', key: 'carpool', upperKey: 'CARPOOL' } as const

export const MILITARY_BRANCHES = {
  육군: 'ARMY',
  해군: 'NAVY',
  해병대: 'MARINE',
  공군: 'AIRFORCE',
  기타: 'ETC',
} as const

export type MilitaryBranchCode = (typeof MILITARY_BRANCHES)[keyof typeof MILITARY_BRANCHES]
export type MilitaryBranchName = keyof typeof MILITARY_BRANCHES

export const BUS_RESERVATION_STATES = {
  COMPLETED: '신청 완료',
  NOT_FOUND: '정보 없음',
  PENDING: '조회 전',
} as const

export type BusReservationState =
  (typeof BUS_RESERVATION_STATES)[keyof typeof BUS_RESERVATION_STATES]

export const ERROR_MESSAGES = {
  NO_POST: '게시글이 존재하지 않습니다.',
  NO_SEARCH_NAME: '검색어를 입력해주세요.',
  FETCH_FAIL: '데이터를 불러오지 못했습니다.',
}
