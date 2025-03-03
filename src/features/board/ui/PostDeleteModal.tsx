import { useNavigate } from 'react-router-dom'

import { useDeletePost } from '@/features/board/api/useBoard.mutation'
import { useParamId } from '@/shared/hook/useParamId'
import { useIsSuccessModal, useModalActions } from '@/shared/model/modal.store'
import { ModalWithOneButton, ModalWithTwoButton } from '@/shared/ui/modal/ButtonModal'

const DeleteConfirmationModal = () => {
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

const DeleteResultModal = () => {
  const navigate = useNavigate()
  const isSuccessModal = useIsSuccessModal()
  const { closeModal } = useModalActions()

  const handleDeleteSuccessModal = () => {
    closeModal()
    navigate(`/carpool`, { replace: true })
  }

  return (
    <ModalWithOneButton onClickButton={isSuccessModal ? handleDeleteSuccessModal : closeModal} />
  )
}

export const PostDeleteModal = () => (
  <>
    <DeleteConfirmationModal />
    <DeleteResultModal />
  </>
)
