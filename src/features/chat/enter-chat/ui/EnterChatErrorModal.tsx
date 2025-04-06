import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const EnterChatErrorModal = () => {
  return (
    <ModalWithOneButton
      modalKey={MODAL_KEYS.ENTER_CHAT_ERROR}
      button={{ onClickButton: undefined }}
    />
  )
}
