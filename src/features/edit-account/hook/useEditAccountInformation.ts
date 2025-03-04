import { useFormContext } from 'react-hook-form'

import { useUpdateAccountInformation } from '@/entities/mypage/api/useMypage.mutation'
import { accountInformationAttribute } from '@/entities/mypage/model/mypage.schema'
import type { AccountInformation } from '@/entities/mypage/model/mypage.type'
import { useNicknameUniqueState } from '@/features/check-nickname-duplication/model/nicknameDuplicationCheck.store'
import { useModalActions } from '@/shared/model/modal.store'

export const useEditAccountInformation = () => {
  const { handleSubmit, setError, clearErrors } = useFormContext<AccountInformation>()

  const nicknameField = accountInformationAttribute.NICKNAME.section

  const isNicknameUnique = useNicknameUniqueState()

  const { openOneButtonModal } = useModalActions()
  const { mutate: updateAccountInformation } = useUpdateAccountInformation()

  const handleSubmitForm = (formData: AccountInformation) => {
    if (isNicknameUnique) {
      clearErrors(nicknameField)
      updateAccountInformation(
        { body: formData },
        {
          onSuccess: (response) => openOneButtonModal(response, true),
          onError: (error) => openOneButtonModal(error.message, false),
        },
      )
    } else {
      setError(nicknameField, { type: 'manual', message: '닉네임 중복 확인을 해주세요.' })
    }
  }

  return { onSubmit: handleSubmit(handleSubmitForm) }
}
