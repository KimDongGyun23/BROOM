import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { useCreatePost } from '@/features/board/api/useBoard.mutation'
import type { PostForm } from '@/features/board/model/post.type'
import { useCustomForm } from '@/hooks/useCustomForm'

export const postAttribute = {
  TITLE: { section: 'title', label: '제목', input: { placeholder: '제목을 입력해주세요.' } },
  TRAINING_DATE: {
    section: 'trainingDate',
    label: '훈련 날짜',
    input: { 'data-placeholder': '훈련 날짜를 선택해주세요.', type: 'date' },
  },
  PLACE: {
    section: 'place',
    label: '출발 장소',
    input: { placeholder: '출발 장소를 입력해주세요.' },
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

export const useCarpoolCreateForm = () => {
  const navigate = useNavigate()
  const { mutate: createPost } = useCreatePost()

  const formMethod = useCustomForm<PostForm>(postSchema)
  const { handleSubmit } = formMethod

  const handleCreateCarpoolPost = (formData: PostForm) => {
    const { hour, minute, personnel, ...rest } = formData
    const submissionData = {
      time: `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`,
      personnel: parseInt(personnel),
      ...rest,
    }

    createPost(
      { body: submissionData },
      { onSuccess: ({ boardId }) => navigate(`/carpool/detail/${boardId}`, { replace: true }) },
    )
  }

  return { formMethod, onSubmit: handleSubmit(handleCreateCarpoolPost) }
}
