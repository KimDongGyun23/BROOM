import { useNavigate } from 'react-router-dom'

import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const DeletePostSuccessModal = () => {
  const navigate = useNavigate()

  const handleClickButton = () => {
    navigate('/board', { replace: true })
  }

  return (
    <ModalWithOneButton
      modalKey={MODAL_KEYS.DELETE_POST_SUCCESS}
      button={{ onClickButton: handleClickButton }}
    />
  )
}
