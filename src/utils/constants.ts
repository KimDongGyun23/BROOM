export const SESSION_LOGIN_KEY = 'login' as const
export const SESSION_NICKNAME = 'user_nickname' as const
export const SESSION_MILITARY_CHPLAIN = 'user_chplain' as const
export const SESSION_ROOM_TYPE = 'room_type' as const
export const SESSION_REFRESH = 'hsefr' as const

export const TAB_LIST = ['승차 공유', '팀원 모집'] as const
export const TAB_LIST_EN = ['carpool', 'team']

export const NOTICE_ARR = [
  '예비군 버스 대절 추첨 인원 선정',
  '예비군 버스 대절 추첨 인원 선정',
  '예비군 버스 대절 추첨 인원 선정',
  '예비군 버스 대절 추첨 인원 선정',
] as const

export const MILITARY_BRANCHES = {
  육군: 'ARMY',
  해군: 'NAVY',
  해병대: 'MARINE',
  공군: 'AIRFORCE',
  기타: 'ETC',
} as const

export const KEBAB_LIST = {
  title: '제목',
  trainingDate: '훈련 날짜',
  departPlace: '출발 장소',
} as const

export const BUS_RESERVE_CONTENT = [
  { label: '신청 기간', contents: ['05/08 (수) ~ 05/12 (일)'] },
  { label: '신청 대상', contents: ['예비군에 참여하는 광운대학교 재학생'] },
  {
    label: '운행 방식',
    contents: [
      '광운대학교 구 정문 (복지관 1층) - 금곡 예비군 훈련장',
      '버스 탑승료 무료',
      '일자별 버스 2대, 총 88석 추첨',
    ],
  },
  {
    label: '당첨자 추첨',
    contents: ['05/13 (월) 18시 인스타그램 라이브 방송', '작성한 연락처로 개별 연락 예정'],
  },
  {
    label: '당첨자 입금 기한',
    contents: [
      '05/14 (화) 23:59',
      '입금 계좌는 당첨자 개별 연락 시 공지 예정',
      '노쇼 방지를 위해 당첨자 대상으로 보증금 (2만원) 제도를 실시하며, 보증금 미입금시 당첨 취소처리 됩니다.',
      '보증금은 06/03 (월)에 일괄 환급 예정',
    ],
  },
  {
    label: '주의사항',
    contents: [
      '학생증이나 광운대학교 도서관 출입증을 준비해주세요.',
      '05/14까지 보증금 2만원을 입금하지 않으면 추첨 명단에서 제외됩니다.',
      '귀가 시에도 버스를 이용하셔야 신청이 가능합니다.',
      '귀가 버스를 이용하지 않으시면 보증금 환급이 불가능합니다. ( 개별 귀가 불가능 )',
    ],
  },
]
