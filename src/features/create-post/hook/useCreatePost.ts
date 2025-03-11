import { useNavigate } from 'react-router-dom'

import type { PostForm } from '@/entities/board/model/post.type'

import { useCreatePostMutation } from '../api/useCreatePost.mutation'

export const useCreatePost = () => {
  const navigate = useNavigate()

  const { mutate: createPost } = useCreatePostMutation()

  const handleCreatePost = (formData: PostForm) => {
    const { hour, minute, personnel, ...rest } = formData
    const submissionData = {
      time: `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`,
      personnel: parseInt(personnel),
      ...rest,
    }

    createPost(
      { body: submissionData },
      { onSuccess: ({ boardId }) => navigate(`/board/detail/${boardId}`, { replace: true }) },
    )
  }

  return { handleCreatePost }
}
