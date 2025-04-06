import { useFormContext } from 'react-hook-form'

import type { PostFormType } from '@/entities/board/model/post.type'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { useEditPost } from '../model/useEditPost'

export const EditPostHeader = () => {
  const { handleSubmit } = useFormContext<PostFormType>()

  const { handleEditPost } = useEditPost()

  return (
    <SubHeaderWithoutIcon
      type="complete"
      title="승차 공유 수정"
      onClickComplete={handleSubmit(handleEditPost)}
    />
  )
}
