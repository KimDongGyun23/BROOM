import { useFormContext } from 'react-hook-form'

import type { AccountDetails } from '@/entities/mypage/model/mypage.type'
import {
  useNicknameDuplicationCheckActions,
  useNicknameUniqueState,
} from '@/features/check-nickname-duplication/model/nicknameDuplicationCheck.store'
import { useUserData } from '@/features/login/model/auth.store'
import type { OpenModal } from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { accountAttribute } from '@/widgets/form/schema/account.schema'

import { useUpdateAccountDetailsMutation } from '../api/useUpdateAccountDetails.mutation'

export const useUpdateAccountDetails = (openModal: OpenModal) => {
  const { setError, clearErrors } = useFormContext<AccountDetails>()

  const nicknameField = accountAttribute.NICKNAME.section

  const user = useUserData()
  const isNicknameUnique = useNicknameUniqueState()

  const { clearNicknameDuplicationCheckState } = useNicknameDuplicationCheckActions()

  const { mutate: updateAccountDetails } = useUpdateAccountDetailsMutation()

  const handleUpdateAccountDetails = (formData: AccountDetails) => {
    if (user?.nickname === formData.nickname && isNicknameUnique !== false) {
      updateAccountDetails(
        { body: formData },
        {
          onSuccess: (response) => {
            openModal(MODAL_KEYS.success, response)
            clearNicknameDuplicationCheckState()
            clearErrors(nicknameField)
          },
        },
      )
    } else {
      setError(nicknameField, { type: 'manual', message: '닉네임 중복 확인을 해주세요.' })
    }
  }

  return { handleUpdateAccountDetails }
}
