import { useNavigate } from 'react-router-dom'

import { instance } from '@/app/api'
import { useAuthActions } from '@/features/login/model/auth.store'
import type { OpenModal } from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useDeleteIdMutation } from '../api/useDeleteId.mutation'

export const useDeleteId = (openModal: OpenModal) => {
  const navigate = useNavigate()

  const { mutate: deleteId } = useDeleteIdMutation()

  const { logout } = useAuthActions()

  const handleDeleteId = () => {
    deleteId(undefined, {
      onSuccess: () => {
        logout()
        instance.resetAccessToken()
        navigate('/home')
      },
      onError: (error) => openModal(MODAL_KEYS.error, error.message),
    })
  }

  return { handleDeleteId }
}
