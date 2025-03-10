import { useNavigate } from 'react-router-dom'

import { instance } from '@/app/api'
import { useAuthActions } from '@/features/login/model/auth.store'

import { useDeleteIdMutation } from '../api/useDeleteId.mutation'

export const useDeleteId = () => {
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
    })
  }

  return { handleDeleteId }
}
