import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import type { ModalWithOneButtonProps } from '@/shared/ui/modal/ButtonModal'
import { ModalWithTwoButton } from '@/shared/ui/modal/ButtonModal'

import { useDeletePost } from '../hook/useDeletePost'

import { DeletePostErrorModal } from './DeletePostErrorModal'
import { DeletePostSuccessModal } from './DeletePostSuccessModal'

export const DeleteConfirmationModal = ({
  label: confirmModalLabel,
  isModalOpen: isConfirmModalOpen,
  closeModal: closeConfirmModal,
}: Omit<ModalWithOneButtonProps, 'button'>) => {
  const { isModalOpen, modalLabel, openModal, closeModal } = useModal()
  const { handleDeletePost } = useDeletePost(openModal)

  return (
    <>
      <ModalWithTwoButton
        label={confirmModalLabel}
        isModalOpen={isConfirmModalOpen}
        closeModal={closeConfirmModal}
        primaryButton={{ onClickButton: handleDeletePost, buttonLabel: '삭제' }}
      />
      <DeletePostSuccessModal
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
      />
      <DeletePostErrorModal
        label={modalLabel(MODAL_KEYS.error)}
        isModalOpen={isModalOpen(MODAL_KEYS.error)}
        closeModal={closeModal}
      />
    </>
  )
}
