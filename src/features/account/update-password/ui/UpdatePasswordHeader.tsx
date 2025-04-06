import { useFormContext } from 'react-hook-form'

import type { NewPasswordForm } from '@/entities/mypage/model/mypage.type'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { useUpdatePassword } from '../model/useUpdatePassword'

export const UpdatePasswordHeader = () => {
  const { handleSubmit } = useFormContext<NewPasswordForm>()
  const { handleUpdatePassword } = useUpdatePassword()

  return (
    <SubHeaderWithoutIcon
      type="complete"
      title="비밀번호 재설정"
      onClickComplete={handleSubmit(handleUpdatePassword)}
    />
  )
}
