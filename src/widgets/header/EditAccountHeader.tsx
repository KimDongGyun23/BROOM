import { useFormContext } from 'react-hook-form'

import type { AccountDetails } from '@/entities/mypage/model/mypage.type'
import { useUpdateAccountDetails } from '@/features/update-account/hook/useUpdateAccountDetails'
import type { OpenModal } from '@/shared/hook/useModal'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

type Props = {
  openModal: OpenModal
}

export const UpdateAccountHeader = ({ openModal }: Props) => {
  const { handleSubmit } = useFormContext<AccountDetails>()

  const { handleUpdateAccountDetails } = useUpdateAccountDetails(openModal)

  return (
    <SubHeaderWithoutIcon
      type="complete"
      title="계정 정보 수정"
      onClickComplete={handleSubmit(handleUpdateAccountDetails)}
    />
  )
}
