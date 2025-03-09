import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import type { PostForm } from '@/entities/board/model/post.type'
import type { OpenModal } from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useCreatePostMutation } from '../api/useCreatePost.mutation'

export const useCreatePost = (openModal: OpenModal) => {
  const navigate = useNavigate()

  const { mutate: createPost } = useCreatePostMutation()

  const { handleSubmit } = useFormContext<PostForm>()

  const handleCreatePost = (formData: PostForm) => {
    const { hour, minute, personnel, ...rest } = formData
    const submissionData = {
      time: `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`,
      personnel: parseInt(personnel),
      ...rest,
    }

    createPost(
      { body: submissionData },
      {
        onSuccess: ({ boardId }) => navigate(`/board/detail/${boardId}`, { replace: true }),
        onError: (error) => openModal(MODAL_KEYS.error, error.message),
      },
    )
  }

  return { onSubmit: handleSubmit(handleCreatePost) }
}
