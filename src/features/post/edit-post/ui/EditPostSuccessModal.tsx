import type { To } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const EditPostSuccessModal = () => {
  const navigate = useNavigate()

  const handleClickModalButton = () => {
    navigate(-1 as To, { replace: true })
  }

  return (
    <ModalWithOneButton
      modalKey={MODAL_KEYS.EDIT_POST}
      button={{ onClickButton: handleClickModalButton }}
    />
  )
}
