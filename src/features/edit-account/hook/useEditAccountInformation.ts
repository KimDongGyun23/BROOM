import { useFormContext } from 'react-hook-form'

import { accountInformationAttribute } from '@/entities/mypage/model/mypage.schema'
import type { AccountInformation } from '@/entities/mypage/model/mypage.type'
import { useNicknameUniqueState } from '@/features/check-nickname-duplication/model/nicknameDuplicationCheck.store'
import type { OpenModal } from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useEditAccountInformationMutation } from '../api/useEditAccountInformation.mutation'

export const useEditAccountInformation = (openModal: OpenModal) => {
  const { setError, clearErrors } = useFormContext<AccountInformation>()

  const nicknameField = accountInformationAttribute.NICKNAME.section

  const isNicknameUnique = useNicknameUniqueState()

  const { mutate: editAccountInformation } = useEditAccountInformationMutation()

  const handleEditAccountInformation = (formData: AccountInformation) => {
    if (isNicknameUnique) {
      clearErrors(nicknameField)
      editAccountInformation(
        { body: formData },
        { onSuccess: (response) => openModal(MODAL_KEYS.success, response) },
      )
    } else {
      setError(nicknameField, { type: 'manual', message: '닉네임 중복 확인을 해주세요.' })
    }
  }

  return { handleEditAccountInformation }
}
