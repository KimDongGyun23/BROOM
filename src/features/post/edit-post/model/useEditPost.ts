import type { PostFormType } from '@/entities/board/model/post.type'
import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { useParamId } from '@/shared/hook/useParamId'
import { useModalActions } from '@/shared/model/modal.store'

import { useEditPostMutation } from '../api/useEditPost.mutation'

export const useEditPost = () => {
  const boardId = useParamId()

  const { openModal } = useModalActions()

  const { mutate: editPost } = useEditPostMutation()

  const handleEditPost = (formData: PostFormType) => {
    const { hour, minute, personnel, ...rest } = formData
    const submissionData = {
      time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      personnel: parseInt(personnel as string),
      ...rest,
    }

    editPost(
      { urls: { boardId }, body: submissionData },
      { onSuccess: () => openModal(MODAL_KEYS.EDIT_POST, '게시글이 수정되었습니다.') },
    )
  }

  return { handleEditPost }
}
