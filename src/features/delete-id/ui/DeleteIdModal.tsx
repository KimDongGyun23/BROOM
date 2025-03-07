import { useNavigate } from 'react-router-dom'

import { instance } from '@/app/api'
import { useAuthActions } from '@/features/login/model/auth.store'
import { useIsSuccessModal } from '@/shared/model/modal.store'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const DeleteIdModal = () => {
  const navigate = useNavigate()

  const { logout } = useAuthActions()

  const isSuccessModal = useIsSuccessModal()

  const handleCloseSuccessModal = () => {
    logout()
    instance.resetAccessToken()
    navigate('/home')
  }

  return <ModalWithOneButton onClickButton={isSuccessModal ? handleCloseSuccessModal : undefined} />
}
