import type { PostForm } from '@/entities/board/model/post.type'
import type { OpenModal } from '@/shared/hook/useModal'
import { useParamId } from '@/shared/hook/useParamId'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useEditPostMutation } from '../api/useEditPost.mutation'

export const useEditPost = (openModal: OpenModal) => {
  const boardId = useParamId()

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
      { onSuccess: () => openModal(MODAL_KEYS.success, '게시글이 수정되었습니다.') },
    )
  }

  return { handleEditPost }
}
