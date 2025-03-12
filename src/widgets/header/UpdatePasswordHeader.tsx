import { useFormContext } from 'react-hook-form'

import type { UpdatePasswordForm } from '@/entities/mypage/model/mypage.type'
import { useUpdatePassword } from '@/features/update-password/hook/useUpdatePassword'
import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { UpdatePasswordSuccessModal } from './modal/UpdatePasswordSuccessModal'

export const UpdatePasswordHeader = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  const { handleSubmit } = useFormContext<UpdatePasswordForm>()

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
