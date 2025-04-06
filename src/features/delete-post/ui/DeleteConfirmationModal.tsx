import { useDeletePost } from '@/features/delete-post/model/useDeletePost'
import type { OpenModal } from '@/shared/hook/useModal'
import { ModalWithTwoButton } from '@/shared/ui/modal/ButtonModal'

type Props = {
  label: string
  isModalOpen: boolean
  closeModal: VoidFunction
  openModal: OpenModal
}

export const DeleteConfirmationModal = ({ label, isModalOpen, closeModal, openModal }: Props) => {
  const { handleDeletePost } = useDeletePost(openModal)

  return (
    <ModalWithTwoButton
      label={label}
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      primaryButton={{ onClickButton: handleDeletePost, buttonLabel: '삭제' }}
    />
  )
}
