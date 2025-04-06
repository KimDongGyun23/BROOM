import { useFormContext } from 'react-hook-form'

import type { AccountDetails } from '@/entities/mypage/model/mypage.type'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { useUpdateAccount } from '../model/useUpdateAccount'

export const UpdateAccountHeader = () => {
  const { handleSubmit } = useFormContext<AccountDetails>()

  const { handleUpdateAccount } = useUpdateAccount()

  return (
    <SubHeaderWithoutIcon
      type="complete"
      title="계정 정보 수정"
      onClickComplete={handleSubmit(handleUpdateAccount)}
    />
  )
}
