import { useFormContext } from 'react-hook-form'

import { accountAttribute } from '@/entities/mypage/config/account.schema'
import type { AccountDetails } from '@/entities/mypage/model/mypage.type'
import {
  useNicknameDuplicationCheckActions,
  useNicknameUniqueState,
} from '@/features/check-duplication/model/duplication.store'
import { useUserData } from '@/entities/auth/model/auth.store'
import type { OpenModal } from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useUpdateAccountDetailsMutation } from '../api/useUpdateAccountDetails.mutation'

export const useUpdateAccountDetails = (openModal: OpenModal) => {
  const { setError, clearErrors } = useFormContext<AccountDetails>()

  const nicknameField = accountAttribute.NICKNAME.section

  const user = useUserData()
  const isNicknameUnique = useNicknameUniqueState()

  const { clearDuplicationCheckState } = useNicknameDuplicationCheckActions()

  const { mutate: updateAccountDetails } = useUpdateAccountDetailsMutation()

  const handleUpdateAccountDetails = (formData: AccountDetails) => {
    const isNicknameChanged = user?.nickname !== formData.nickname
    const requiresVerification = isNicknameChanged && isNicknameUnique !== true

    if (requiresVerification) {
      setError(nicknameField, {
        type: 'manual',
        message: '닉네임 중복 검사를 진행해주세요.',
      })
    } else {
      updateAccountDetails(
        { body: formData },
        {
          onSuccess: (response) => {
            openModal(MODAL_KEYS.success, response)
            clearDuplicationCheckState()
            clearErrors(nicknameField)
          },
        },
      )
    }
  }

  return { handleUpdateAccountDetails }
}
