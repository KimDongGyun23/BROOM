import type { OpenModal } from '@/shared/hook/useModal'
import { useParamId } from '@/shared/hook/useParamId'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useDeletePostMutation } from '../api/useDeletePost.mutation'

export const useDeletePost = (openModal: OpenModal) => {
  const boardId = useParamId()

  const { mutate: deletePost } = useDeletePostMutation()

  const handleDeletePost = () => {
    deletePost(
      { urls: { boardId } },
      {
        onSuccess: (response) => openModal(MODAL_KEYS.success, response),
        onError: (error) => openModal(MODAL_KEYS.error, error.message),
      },
    )
  }

  return { handleDeletePost }
}
