import { useParamId } from '@/shared/hook/useParamId'
import { useModalActions } from '@/shared/model/modal.store'

import { useExpelUserMutation } from '../api/useExpelUser.mutation'

export const useExpelUser = (userId: string) => {
  const boardId = useParamId()

  const { openOneButtonModal } = useModalActions()

  const { mutate: expelUser } = useExpelUserMutation()

  const handleExpelUser = () => {
    expelUser(
      { body: { expellId: userId, boardId } },
      {
        onSuccess: (response) => openOneButtonModal(response, true),
        onError: (error) => openOneButtonModal(error.message, false),
      },
    )
  }

  return handleExpelUser
}
