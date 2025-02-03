import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { useCustomForm } from '@/hooks/useCustomForm'
import { useCreatePost } from '@/services/query/usePostQuery'
import type { PostForm } from '@/types/post'
import { TAB_UPPER_KEYS } from '@/utils/constants'

export const postAttribute = {
  TITLE: { section: 'title', label: '제목', input: { placeholder: '제목을 입력해주세요.' } },
  TRAINING_DATE: {
    section: 'trainingDate',
    label: '훈련 날짜',
    input: { 'data-placeholder': '훈련 날짜를 선택해주세요.', type: 'date' },
  },
  PLACE: {
    section: 'place',
    label: '만날 장소',
    input: { placeholder: '만날 장소를 입력해주세요.' },
  },
  PERSONNEL: {
    section: 'personnel',
    label: '모집 인원',
  },
  TIME: { section: 'hour', label: '시간', input: { hourSection: 'hour', minuteSection: 'minute' } },
  CONTENT: {
    section: 'content',
    label: '메모',
    input: { placeholder: '원하시는 메모 내용을 적어주세요.' },
  },
}

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

export const useTeamCreateForm = () => {
  const navigate = useNavigate()
  const { mutate: createPost } = useCreatePost()

  const formMethod = useCustomForm<PostForm>(postSchema)
  const { handleSubmit } = formMethod

  const handleSubmitForm = (formData: PostForm) => {
    const { hour, minute, personnel, ...rest } = formData
    const submissionData = {
      time: `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`,
      category: TAB_UPPER_KEYS[1],
      personnel: parseInt(personnel),
      ...rest,
    }

    createPost(
      { body: submissionData },
      { onSuccess: ({ boardId }) => navigate(`/team/detail/${boardId}`, { replace: true }) },
    )
  }

  return { formMethod, onSubmit: handleSubmit(handleSubmitForm) }
}
