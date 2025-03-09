import type { OpenModal } from '@/shared/hook/useModal'
import { useParamId } from '@/shared/hook/useParamId'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useExpelUserMutation } from '../api/useExpelUser.mutation'

export const useExpelUser = (userId: string, openModal: OpenModal) => {
  const boardId = useParamId()

  const { mutate: expelUser } = useExpelUserMutation()

  const handleExpelUser = () => {
    expelUser(
      { body: { expellId: userId, boardId } },
      {
        onSuccess: (response) => openModal(MODAL_KEYS.success, response),
        onError: (error) => openModal(MODAL_KEYS.error, error.message),
      },
    )
  }

  return handleExpelUser
}
