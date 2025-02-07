import { z } from 'zod'

export const FORM_ATTRIBUTE = {
  LOGIN_ID: {
    section: 'userId',
    label: '아이디',
    input: { placeholder: '아이디를 입력해주세요.' },
  },
  LOGIN_PASSWORD: {
    section: 'password',
    label: '비밀번호',
    input: { placeholder: '비밀번호를 입력해주세요.' },
  },
  SIGNUP_ID: {
    section: 'userId',
    label: '아이디',
    input: { placeholder: '최소 6글자, 최대 12글자입니다.' },
  },
  SIGNUP_PASSWORD: {
    section: 'password',
    label: '비밀번호',
    input: { placeholder: '최소 8글자, 최대 16글자입니다.' },
  },
  CONFIRM: {
    section: 'confirm',
    label: '비밀번호 확인',
    input: { placeholder: '비밀번호를 다시 입력해주세요.' },
  },
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
  MILITARY_BRANCH: { section: 'militaryBranch', label: '복무했던 군종' },

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
    input: { 'data-placeholder': '훈련 날짜를 선택해주세요.', type: 'date' },
  },
  CARPOOL_PLACE: {
    section: 'place',
    label: '출발 장소',
    input: { placeholder: '출발 장소를 입력해주세요.' },
  },
  TEAM_PLACE: {
    section: 'place',
    label: '만날 장소',
    input: { placeholder: '만날 장소를 입력해주세요.' },
  },
  PERSONNEL: {
    section: 'personnel',
    label: '모집 인원',
  },
  TIME: { section: 'hour', label: '시간', input: { hourSection: 'hour', minuteSection: 'minute' } },
  MEMO: {
    section: 'content',
    label: '메모',
    input: { placeholder: '원하시는 메모 내용을 적어주세요.' },
  },
} as const

export const postSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요.' }),
  trainingDate: z.string().min(1, { message: '훈련 날짜를 선택해주세요.' }),
  place: z.string().min(1, { message: '장소를 입력해주세요.' }),
  personnel: z.string().refine((value) => value !== '' && value !== null && value !== undefined, {
    message: '필수',
  }),
  hour: z.string().refine((value) => value !== '' && value !== null && value !== undefined, {
    message: '필수',
  }),
  minute: z.string().refine((value) => value !== '' && value !== null && value !== undefined, {
    message: '필수',
  }),
  content: z.string().optional(),
})

export const busSchema = z.object({
  name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  studentId: z.string().length(10, { message: '학번은 10자리 숫자여야 합니다.' }),
  phoneNumber: z
    .string()
    .min(9, { message: '전화번호를 확인해주세요.' })
    .max(11, { message: '전화번호는 11자리 이하입니다.' }),
})

export const busReserveInfoSchema = z.object({
  studentId: z.string().length(10, { message: '학번은 10자리 숫자여야 합니다.' }),
})
