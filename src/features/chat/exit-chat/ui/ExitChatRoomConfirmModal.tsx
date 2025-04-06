import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { ModalWithTwoButton } from '@/shared/ui/modal/ButtonModal'

import { useExitChatRoom } from '../model/useExitChatRoom'

export const ExitChatRoomConfirmModal = () => {
  const { handleClickExitRoom } = useExitChatRoom()

  return (
    <ModalWithTwoButton
      modalKey={MODAL_KEYS.EXIT_CHAT_CONFIRM}
      primaryButton={{ onClickButton: handleClickExitRoom, buttonLabel: '확인' }}
    />
  )
}
