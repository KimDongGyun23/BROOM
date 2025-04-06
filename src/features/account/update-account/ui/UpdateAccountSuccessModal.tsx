import { useNavigate } from 'react-router-dom'

import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const UpdateAccountSuccessModal = () => {
  const navigate = useNavigate()

  const handleClickModal = () => {
    navigate('/mypage', { replace: true })
  }

  return (
    <ModalWithOneButton
      modalKey={MODAL_KEYS.UPDATE_ACCOUNT}
      button={{ onClickButton: handleClickModal }}
    />
  )
}
