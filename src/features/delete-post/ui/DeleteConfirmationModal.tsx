import { useDeletePost } from '@/entities/board/api/useBoard.mutation'
import { useParamId } from '@/shared/hook/useParamId'
import { useModalActions } from '@/shared/model/modal.store'
import { ModalWithTwoButton } from '@/shared/ui/modal/ButtonModal'

export const DeleteConfirmationModal = () => {
  const boardId = useParamId()

  const { mutate: deletePost } = useDeletePost()
  const { openOneButtonModal } = useModalActions()

  const handleDeletePost = () => {
    deletePost(
      { urls: { boardId } },
      {
        onSuccess: (response) => openOneButtonModal(response, true),
        onError: (error) => openOneButtonModal(error.message, false),
      },
    )
  }

  return (
    <ModalWithTwoButton primaryButton={{ onClickButton: handleDeletePost, buttonLabel: '삭제' }} />
  )
}
