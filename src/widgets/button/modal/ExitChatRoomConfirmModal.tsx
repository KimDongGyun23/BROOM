import { useExitChatRoom } from '@/features/exit-chat/hook/useExitChatRoom'
import type { ModalWithTwoButtonProps } from '@/shared/ui/modal/ButtonModal'
import { ModalWithTwoButton } from '@/shared/ui/modal/ButtonModal'

export const ExitChatRoomConfirmModal = ({
  label,
  isModalOpen,
  closeModal,
}: Omit<ModalWithTwoButtonProps, 'primaryButton' | 'secondaryButton'>) => {
  const { handleClickExitRoom } = useExitChatRoom(closeModal)

  return (
    <ModalWithTwoButton
      label={label}
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      primaryButton={{ onClickButton: handleClickExitRoom, buttonLabel: '확인' }}
    />
  )
}
