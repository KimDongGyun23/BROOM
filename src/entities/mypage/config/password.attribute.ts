export const newPasswordAttribute = {
  PREV_PASSWORD: {
    section: 'password',
    label: '기존 비밀번호',
    input: { placeholder: '기존 비밀번호를 입력해주세요.' },
  },
  NEW_PASSWORD: {
    section: 'newPassword',
    label: '새로운 비밀번호',
    input: { placeholder: '최소 8글자, 최대 16글자입니다.' },
  },
  CONFIRM: {
    section: 'confirm',
    label: '비밀번호 확인',
    input: { placeholder: '비밀번호를 다시 입력해주세요.' },
  },
} as const
