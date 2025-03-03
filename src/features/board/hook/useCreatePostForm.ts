import { useNavigate } from 'react-router-dom'

import type { PostForm } from '@/entities/board/model/post.type'
import { useCreatePost } from '@/features/board/api/useBoard.mutation'
import { useCustomForm } from '@/shared/hook/useCustomForm'

import { postSchema } from '../config/post.schema'

export const useCreatePostForm = () => {
  const navigate = useNavigate()
  const { mutate: createPost } = useCreatePost()

  const formMethod = useCustomForm<PostForm>(postSchema)
  const { handleSubmit } = formMethod

  const handleCreatePost = (formData: PostForm) => {
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

  return { formMethod, onSubmit: handleSubmit(handleCreatePost) }
}
