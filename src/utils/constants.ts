export const TAB_LIST = [{ label: '승차 공유', key: 'carpool', upperKey: 'CARPOOL' }] as const
export const TAB_LABELS = TAB_LIST.map((tab) => tab.label)
export const TAB_KEYS = TAB_LIST.map((tab) => tab.key)
export const TAB_UPPER_KEYS = TAB_LIST.map((tab) => tab.upperKey)

export type TabLabel = (typeof TAB_LIST)[number]['label']
export type TabKey = (typeof TAB_LIST)[number]['key']
export type TabUpperKey = (typeof TAB_LIST)[number]['upperKey']

export const SEARCH_OPTIONS = [
  { label: '제목', key: 'title', placeholder: '제목을 입력해주세요.' },
  { label: '훈련 날짜', key: 'trainingDate', placeholder: '훈련 날짜를 선택해주세요.' },
  { label: '출발 장소', key: 'place', placeholder: '출발 장소를 입력해주세요.' },
] as const

export type SearchOption = (typeof SEARCH_OPTIONS)[number]

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
