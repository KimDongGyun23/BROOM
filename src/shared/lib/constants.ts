export const MILITARY_BRANCHES = {
  육군: 'ARMY',
  해군: 'NAVY',
  해병대: 'MARINE',
  공군: 'AIRFORCE',
  기타: 'ETC',
} as const

export type MilitaryBranchCode = (typeof MILITARY_BRANCHES)[keyof typeof MILITARY_BRANCHES]
export type MilitaryBranchName = keyof typeof MILITARY_BRANCHES

export const ERROR_MESSAGES = {
  NO_POST: '게시글 목록이 존재하지 않습니다.',
  NO_SEARCH_NAME: '검색어를 입력해주세요.',
  FETCH_FAIL: '데이터를 불러오지 못했습니다.',
  NO_CHAT: '채팅 목록이 존재하지 않습니다.',
}
