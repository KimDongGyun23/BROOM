export const accountAttribute = {
  NICKNAME: {
    section: 'nickname',
    label: '닉네임',
    input: { placeholder: '최소 2글자, 최대 8글자입니다.' },
  },
  DISCHARGE_YEAR: {
    section: 'dischargeYear',
    label: '전역 연도',
    input: { placeholder: '숫자 4자리를 입력해주세요.', maxLength: 4 },
  },
  MILITARY_BRANCH: { section: 'militaryBranch', label: '복무했던 군종' },
} as const
