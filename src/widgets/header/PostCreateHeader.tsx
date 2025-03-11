import { useFormContext } from 'react-hook-form'

import type { PostForm } from '@/entities/board/model/post.type'
import { useCreatePost } from '@/features/create-post/hook/useCreatePost'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

export const PostCreateHeader = () => {
  const { handleSubmit } = useFormContext<PostForm>()

  const { handleCreatePost } = useCreatePost()

  return (
    <SubHeaderWithoutIcon
      type="complete"
      title="승차 공유 등록"
      onClickComplete={handleSubmit(handleCreatePost)}
    />
  )
}
