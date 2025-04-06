import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthActions } from '@/entities/auth/model/auth.store'
import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { useModalActions } from '@/shared/model/modal.store'

export const useNavigateAfterLogout = () => {
  const navigate = useNavigate()
  const { logout } = useAuthActions()
  const { isModalOpen, closeModal } = useModalActions()

  const handleNavigateAfterLogout = useCallback(() => {
    closeModal()
    navigate('/home')
    logout()

    if (window.history.state?.isLogoutModalOpen) {
      window.history.replaceState({}, '')
    }
  }, [closeModal, navigate, logout])

  useEffect(() => {
    if (isModalOpen(MODAL_KEYS.LOGOUT)) {
      const handlePopState = (event: PopStateEvent) => {
        if (event.state?.isLogoutModalOpen) {
          handleNavigateAfterLogout()
        }
      }

      window.addEventListener('popstate', handlePopState)
      return () => window.removeEventListener('popstate', handlePopState)
    }
  }, [handleNavigateAfterLogout, isModalOpen])

  return { handleNavigateAfterLogout }
}
