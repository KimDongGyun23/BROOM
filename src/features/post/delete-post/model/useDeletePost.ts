import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { useParamId } from '@/shared/hook/useParamId'
import { useModalActions } from '@/shared/model/modal.store'

import { useDeletePostMutation } from '../api/useDeletePost.mutation'

export const useDeletePost = () => {
  const boardId = useParamId()

  const { openModal } = useModalActions()

  const { mutate: deletePost } = useDeletePostMutation()

  const handleDeletePost = () => {
    deletePost(
      { urls: { boardId } },
      { onSuccess: (response) => openModal(MODAL_KEYS.DELETE_POST_SUCCESS, response) },
    )
  }

  return { handleDeletePost }
}
