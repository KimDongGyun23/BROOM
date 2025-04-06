import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { ModalWithTwoButton } from '@/shared/ui/modal/ButtonModal'

import { useDeletePost } from '../model/useDeletePost'

export const DeleteConfirmationModal = () => {
  const { handleDeletePost } = useDeletePost()

  return (
    <ModalWithTwoButton
      modalKey={MODAL_KEYS.DELETE_POST_CONFIRM}
      primaryButton={{ onClickButton: handleDeletePost, buttonLabel: '삭제' }}
    />
  )
}
