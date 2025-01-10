const TAB_LIST = [
  { label: '승차 공유', key: 'carpool' },
  { label: '팀원 모집', key: 'team' },
] as const
export const TAB_LABELS = TAB_LIST.map((tab) => tab.label)
export const TAB_KEYS = TAB_LIST.map((tab) => tab.key)

export type TabLabel = (typeof TAB_LIST)[number]['label']

export const SEARCH_OPTIONS = [
  { label: '제목', key: 'title', placeholder: '제목을 입력해주세요.' },
  { label: '훈련 날짜', key: 'trainingDate', placeholder: '훈련 날짜를 입력해주세요.' },
  { label: '출발 장소', key: 'departPlace', placeholder: '출발 장소를 입력해주세요.' },
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
}

export const FORM_ATTRIBUTE = {
  LOGIN_ID: {
    section: 'userId',
    label: '아이디',
    input: { placeholder: '아이디를 입력해주세요.' },
  },
  LOGIN_PASSWORD: {
    section: 'password',
    label: '비밀번호',
    input: { placeholder: '비밀번호를 입력해주세요.', type: 'password' },
  },
  SIGNUP_ID: {
    section: 'userId',
    label: '아이디',
    input: { placeholder: '최소 6글자, 최대 12글자입니다.' },
  },
  SIGNUP_PASSWORD: {
    section: 'password',
    label: '비밀번호',
    input: { placeholder: '최소 8글자, 최대 16글자입니다.', type: 'password' },
  },
  CONFIRM: {
    section: 'confirm',
    label: '비밀번호 확인',
    input: { placeholder: '비밀번호를 다시 입력해주세요.', type: 'number' },
  },
  PREV_PASSWORD: {
    section: 'password',
    label: '기존 비밀번호',
    input: { placeholder: '기존 비밀번호를 입력해주세요.', type: 'password' },
  },
  NEW_PASSWORD: {
    section: 'newPassword',
    label: '새로운 비밀번호',
    input: { placeholder: '최소 8글자, 최대 16글자입니다.', type: 'number' },
  },

  NICKNAME: {
    section: 'nickname',
    label: '닉네임',
    input: { placeholder: '최소 2글자, 최대 8글자입니다.' },
  },
  DISCHARGE_YEAR: {
    section: 'dischargeYear',
    label: '전역 연도',
    input: { placeholder: '숫자 4자리를 입력해주세요.', type: 'number' },
  },
  SORT: { section: 'militaryChaplain', label: '복무했던 군종' },

  NAME: { section: 'name', label: '이름', input: { placeholder: '이름을 입력해주세요.' } },
  STUDENT_ID: {
    section: 'studentId',
    label: '학번',
    input: { placeholder: '학번을 입력해주세요.', type: 'number' },
  },
  PHONE_NUMBER: {
    section: 'phoneNumber',
    label: '연락처',
    input: { placeholder: '-를 제외한 숫자만 입력해주세요.', type: 'number' },
  },

  TITLE: { section: 'title', label: '제목', input: { placeholder: '제목을 입력해주세요.' } },
  TRAINING_DATE: {
    section: 'trainingDate',
    label: '훈련 날짜',
    input: { placeholder: '8자리 숫자만 입력해주세요.', type: 'number' },
  },
  DEPART_PLACE: {
    section: 'departPlace',
    label: '출발 장소',
    input: { placeholder: '출발 장소를 입력해주세요.' },
  },
  MEETING_PLACE: {
    section: 'meetingPlace',
    label: '만날 장소',
    input: { placeholder: '만날 장소를 입력해주세요.' },
  },
  PERSONNEL: {
    section: 'personnel',
    label: '모집 인원',
    input: { placeholder: '0', type: 'number', unitLabel: '명' },
  },
  TIME: { section: 'hour', label: '시간', input: { hourSection: 'hour', minuteSection: 'minute' } },
  PRICE: { section: 'price', label: '금액', input: { placeholder: '0', unitLabel: '원' } },
  MEMO: {
    section: 'content',
    label: '메모',
    input: { placeholder: '원하시는 메모 내용을 적어주세요.' },
  },
} as const
