import { useFormContext } from 'react-hook-form'

import type { PostFormType } from '@/entities/board/model/post.type'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { useCreatePost } from '../model/useCreatePost'

export const CreatePostHeader = () => {
  const { handleSubmit } = useFormContext<PostFormType>()
  const { handleCreatePost } = useCreatePost()

  return (
    <SubHeaderWithoutIcon
      type="complete"
      title="승차 공유 등록"
      onClickComplete={handleSubmit(handleCreatePost)}
    />
  )
}
