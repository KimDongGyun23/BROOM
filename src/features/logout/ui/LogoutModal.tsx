import { useNavigate } from 'react-router-dom'

import { clearSessionStorage } from '@/shared/lib/storage'
import { useIsSuccessModal } from '@/shared/model/modal.store'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const LogoutModal = () => {
  const navigate = useNavigate()

  const isSuccessModal = useIsSuccessModal()

  const handleCloseSuccessModal = () => {
    clearSessionStorage()
    navigate('/home')
  }

  return <ModalWithOneButton onClickButton={isSuccessModal ? handleCloseSuccessModal : undefined} />
}
