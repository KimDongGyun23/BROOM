import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { useParamId } from '@/shared/hook/useParamId'
import { useModalActions } from '@/shared/model/modal.store'

import { useExpelUserMutation } from '../api/useExpelUser.mutation'

export const useExpelUser = (userId: string) => {
  const boardId = useParamId()

  const { openModal } = useModalActions()

  const { mutate: expelUser } = useExpelUserMutation()

  const handleExpelUser = () => {
    expelUser(
      { body: { expellId: userId, boardId } },
      { onSuccess: (response) => openModal(MODAL_KEYS.EXPEL_USER, response) },
    )
  }

  return handleExpelUser
}
