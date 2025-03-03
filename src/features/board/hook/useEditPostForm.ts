import type { To } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import type { PostForm } from '@/entities/board/model/post.type'
import { useEditPost } from '@/features/board/api/useBoard.mutation'
import { useFetchPostEditData } from '@/features/board/api/useBoard.query'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { useParamId } from '@/shared/hook/useParamId'

import { postSchema } from '../config/post.schema'

export const useEditPostForm = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const { data: defaultValues, isPending, isError } = useFetchPostEditData({ urls: { boardId } })
  const { mutate: postUpdate } = useEditPost()

  const formMethod = useCustomForm<PostForm>(postSchema, { defaultValues })
  const { handleSubmit } = formMethod

  const handleEditCarpoolPost = (formData: PostForm) => {
    const { hour, minute, personnel, ...rest } = formData
    const submissionData = {
      time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      personnel: parseInt(personnel as string),
      ...rest,
    }

    postUpdate(
      { urls: { boardId }, body: submissionData },
      { onSuccess: () => navigate(-1 as To, { replace: true }) },
    )
  }

  return { formMethod, isPending, isError, onSubmit: handleSubmit(handleEditCarpoolPost) }
}
