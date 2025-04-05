import { useFormContext } from 'react-hook-form'

import type { NewPasswordForm } from '@/entities/mypage/model/mypage.type'
import { useUpdatePassword } from '@/features/update-password/model/useUpdatePassword'
import { UpdatePasswordSuccessModal } from '@/features/update-password/ui/UpdatePasswordSuccessModal'
import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

export const UpdatePasswordHeader = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  const { handleSubmit } = useFormContext<NewPasswordForm>()

  const { handleUpdatePassword } = useUpdatePassword(openModal)

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="비밀번호 재설정"
        onClickComplete={handleSubmit(handleUpdatePassword)}
      />

      <UpdatePasswordSuccessModal
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
      />
    </>
  )
}
