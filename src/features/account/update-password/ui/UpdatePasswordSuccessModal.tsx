import { useNavigate } from 'react-router-dom'

import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const UpdatePasswordSuccessModal = () => {
  const navigate = useNavigate()

  const handleClickModalButton = () => {
    navigate('/mypage', { replace: true })
  }

  return (
    <ModalWithOneButton
      modalKey={MODAL_KEYS.UPDATE_PASSWORD || '비밀번호 변경에 성공했습니다.'}
      button={{ onClickButton: handleClickModalButton }}
    />
  )
}
