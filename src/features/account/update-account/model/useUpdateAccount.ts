import { useFormContext } from 'react-hook-form'

import { useUserData } from '@/entities/auth/model/auth.store'
import { accountAttribute } from '@/entities/mypage/config/account.attribute'
import type { AccountDetails } from '@/entities/mypage/model/mypage.type'
import {
  useNicknameDuplicationCheckActions,
  useNicknameUniqueState,
} from '@/features/auth/check-duplication/model/duplication.store'
import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { useModalActions } from '@/shared/model/modal.store'

import { useUpdateAccountDetailsMutation } from '../api/useUpdateAccountDetails.mutation'
import { validateNicknameUpdate } from '../lib/validateNicknameUpdate'

const useAccountState = () => {
  const user = useUserData()
  const isNicknameUnique = useNicknameUniqueState()

  return {
    currentNickname: user?.nickname,
    isNicknameUnique,
  }
}

export const useUpdateAccount = () => {
  const { openModal } = useModalActions()
  const { currentNickname, isNicknameUnique } = useAccountState()
  const { setError, clearErrors } = useFormContext<AccountDetails>()

  const { clearDuplicationCheckState } = useNicknameDuplicationCheckActions()
  const { mutate: updateAccount } = useUpdateAccountDetailsMutation()

  const nicknameField = accountAttribute.NICKNAME.section

  const handleUpdateAccount = (formData: AccountDetails) => {
    const validation = validateNicknameUpdate(currentNickname, formData.nickname, isNicknameUnique)

    if (!validation.isValid) {
      setError(nicknameField, { type: 'manual', message: validation.error })
    } else {
      updateAccount(
        { body: formData },
        {
          onSuccess: (response) => {
            openModal(MODAL_KEYS.UPDATE_ACCOUNT, response)
            clearDuplicationCheckState()
            clearErrors(nicknameField)
          },
        },
      )
    }
  }

  return { handleUpdateAccount }
}
