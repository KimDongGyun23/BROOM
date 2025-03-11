import { useFormContext } from 'react-hook-form'

import type { PostForm } from '@/entities/board/model/post.type'
import { useEditPost } from '@/features/edit-post/hook/useEditPost'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

export const PostEditHeader = () => {
  const { handleSubmit } = useFormContext<PostForm>()
  const { handleEditPost } = useEditPost()

  return (
    <SubHeaderWithoutIcon
      type="complete"
      title="승차 공유 수정"
      onClickComplete={handleSubmit(handleEditPost)}
    />
  )
}
