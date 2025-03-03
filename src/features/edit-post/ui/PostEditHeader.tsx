import { useFormContext } from 'react-hook-form'
import type { To } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useEditPost } from '@/entities/board/api/useBoard.mutation'
import type { PostForm } from '@/entities/board/model/post.type'
import { useParamId } from '@/shared/hook/useParamId'
import { useModalActions } from '@/shared/model/modal.store'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

export const PostEditHeader = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const { openOneButtonModal } = useModalActions()
  const { mutate: postUpdate } = useEditPost()

  const { handleSubmit } = useFormContext<PostForm>()

  const handleEditPost = (formData: PostForm) => {
    const { hour, minute, personnel, ...rest } = formData
    const submissionData = {
      time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      personnel: parseInt(personnel as string),
      ...rest,
    }

    postUpdate(
      { urls: { boardId }, body: submissionData },
      {
        onSuccess: () => navigate(-1 as To, { replace: true }),
        onError: (error) => openOneButtonModal(error.message),
      },
    )
  }

  return (
    <SubHeaderWithoutIcon
      type="complete"
      title="승차 공유 수정"
      onClickComplete={handleSubmit(handleEditPost)}
    />
  )
}
