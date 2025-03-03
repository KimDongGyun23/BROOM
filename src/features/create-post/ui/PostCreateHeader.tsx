import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useCreatePost } from '@/entities/board/api/useBoard.mutation'
import type { PostForm } from '@/entities/board/model/post.type'
import { useModalActions } from '@/shared/model/modal.store'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

export const PostCreateHeader = () => {
  const navigate = useNavigate()

  const { openOneButtonModal } = useModalActions()
  const { mutate: createPost } = useCreatePost()

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
        onSuccess: ({ boardId }) => navigate(`/carpool/detail/${boardId}`, { replace: true }),
        onError: (error) => openOneButtonModal(error.message),
      },
    )
  }

  return (
    <SubHeaderWithoutIcon
      type="complete"
      title="승차 공유 등록"
      onClickComplete={handleSubmit(handleCreatePost)}
    />
  )
}
