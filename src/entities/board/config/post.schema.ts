import { z } from 'zod'

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
