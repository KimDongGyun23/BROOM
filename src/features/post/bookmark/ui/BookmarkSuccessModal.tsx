import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const BookmarkSuccessModal = () => {
  return (
    <ModalWithOneButton modalKey={MODAL_KEYS.BOOKMARK_POST} button={{ onClickButton: undefined }} />
  )
}
