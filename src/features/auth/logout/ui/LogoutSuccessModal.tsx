import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

import { useNavigateAfterLogout } from '../model/useNavigateAfterLogout'

export const LogoutSuccessModal = () => {
  const { handleNavigateAfterLogout } = useNavigateAfterLogout()

  return (
    <ModalWithOneButton
      modalKey={MODAL_KEYS.LOGOUT}
      button={{ onClickButton: handleNavigateAfterLogout }}
    />
  )
}
