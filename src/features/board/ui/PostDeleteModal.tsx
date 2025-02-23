import { useNavigate } from 'react-router-dom'

import { useDeletePost } from '@/features/board/api/useBoard.mutation'
import { useParamId } from '@/shared/hook/useParamId'
import { ModalWithOneButton, ModalWithTwoButton } from '@/shared/ui/modal/ButtonModal'
import {
  useIsSuccessModal,
  useModalActions,
  useModalState,
  useTwoButtonModalState,
} from '@/stores/modal'

const DeleteConfirmationModal = () => {
  const boardId = useParamId()
  const { mutate: deletePost } = useDeletePost()

  const { isTwoButtonModalOpen, twoButtonLabel } = useTwoButtonModalState()
  const { openModal, closeModal } = useModalActions()

  const handleDeletePost = () => {
    deletePost(
      { urls: { boardId } },
      {
        onSuccess: (response) => openModal(response, true),
        onError: (error) => openModal(error.message, false),
      },
    )
  }

  return (
    <ModalWithTwoButton
      isOpen={isTwoButtonModalOpen}
      onClose={closeModal}
      content={twoButtonLabel}
      secondaryButton={{ onClick: closeModal, label: '취소', secondary: true }}
      primaryButton={{ onClick: handleDeletePost, label: '삭제' }}
    />
  )
}

const DeleteResultModal = () => {
  const navigate = useNavigate()
  const isSuccessModal = useIsSuccessModal()
  const { isModalOpen, label } = useModalState()
  const { closeModal } = useModalActions()

  const handleDeleteSuccessModal = () => {
    closeModal()
    navigate(`/carpool`, { replace: true })
  }

  return (
    <ModalWithOneButton
      isOpen={isModalOpen}
      onClose={closeModal}
      content={label}
      button={{
        onClick: isSuccessModal ? handleDeleteSuccessModal : closeModal,
        label: '확인',
      }}
    />
  )
}

export const PostDeleteModal = () => (
  <>
    <DeleteConfirmationModal />
    <DeleteResultModal />
  </>
)
