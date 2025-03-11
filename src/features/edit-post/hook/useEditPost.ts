import type { To } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import type { PostForm } from '@/entities/board/model/post.type'
import { useParamId } from '@/shared/hook/useParamId'

import { useEditPostMutation } from '../api/useEditPost.mutation'

export const useEditPost = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const { mutate: editPost } = useEditPostMutation()

  const handleEditPost = (formData: PostForm) => {
    const { hour, minute, personnel, ...rest } = formData
    const submissionData = {
      time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      personnel: parseInt(personnel as string),
      ...rest,
    }

    editPost(
      { urls: { boardId }, body: submissionData },
      { onSuccess: () => navigate(-1 as To, { replace: true }) },
    )
  }

  return { handleEditPost }
}
