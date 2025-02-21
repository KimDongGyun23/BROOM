import { useNavigate } from 'react-router-dom'

import { ModalWithOneButton, ModalWithTwoButton } from '@/components/view/modal/ButtonModal'
import { useParamId } from '@/hooks/useParamId'
import { useDeleteCarpoolPost } from '@/query/useCarpoolQuery'
import {
  useIsSuccessModal,
  useModalActions,
  useModalState,
  useTwoButtonModalState,
} from '@/stores/modal'

const DeleteConfirmationModal = () => {
  const boardId = useParamId()
  const { mutate: deletePost } = useDeleteCarpoolPost()

  const { isTwoButtonModalOpen, twoButtonLabel } = useTwoButtonModalState()
  const { openModal, closeModal } = useModalActions()

  const handleDeleteCarpoolPost = () => {
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
      primaryButton={{ onClick: handleDeleteCarpoolPost, label: '삭제' }}
    />
  )
}

const DeleteResultModal = () => {
  const navigate = useNavigate()
  const isSuccessModal = useIsSuccessModal()
  const { isModalOpen, label } = useModalState()
  const { closeModal } = useModalActions()

  const handleCarpoolDeleteSuccess = () => {
    closeModal()
    navigate(`/carpool`, { replace: true })
  }

  const handleCarpoolDeleteError = () => closeModal()

  return (
    <ModalWithOneButton
      isOpen={isModalOpen}
      onClose={closeModal}
      content={label}
      button={{
        onClick: isSuccessModal ? handleCarpoolDeleteSuccess : handleCarpoolDeleteError,
        label: '확인',
      }}
    />
  )
}

export const CarpoolDeleteModal = () => (
  <>
    <DeleteConfirmationModal />
    <DeleteResultModal />
  </>
)
